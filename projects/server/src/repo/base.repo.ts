import { BaseModel } from "@lib/models/base.model";
import { FilterQuery } from "mongodb";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class BaseRepo<T extends BaseModel> {
  protected readonly collectionName: string;
  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getById(
    _id: string
  ): Promise<{
    doc: T;
    statusResponse: IStatusResponse;
  }> {
    if (!_id) {
      return {
        doc: null,
        statusResponse: {
          status: true,
          message: "Id không hợp lệ"
        }
      };
    }

    let result: T = null;
    const client = MongoDbHelper.getMongoClient();

    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);

      result = await collection.findOne<T>({ _id });
    } catch (err) {
      return {
        doc: null,
        statusResponse: {
          status: false,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      doc: result,
      statusResponse: {
        status: true,
        message: "Thành công"
      }
    };
  }

  async getBy(
    query: FilterQuery<any>,
    limit: number = 50
  ): Promise<{
    docs: Array<T>;
    statusResponse: IStatusResponse;
  }> {
    let results: Array<T> = null;
    const client = MongoDbHelper.getMongoClient();
    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);
      const cursor = await collection.find<T>(query);

      if (limit) {
        cursor.limit(limit);
      }

      const raw = await cursor.toArray();
      results = raw;
    } catch (err) {
      return {
        docs: null,
        statusResponse: {
          status: false,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      docs: results,
      statusResponse: {
        status: true,
        message: "Thành công"
      }
    };
  }

  async countBy(
    query: FilterQuery<any>
  ): Promise<{
    total: number;
    statusResponse: IStatusResponse;
  }> {
    let result = 0;
    const client = MongoDbHelper.getMongoClient();
    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);
      result = await collection.countDocuments(query);
    } catch (err) {
      return {
        total: result,
        statusResponse: {
          status: false,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      total: result,
      statusResponse: {
        status: true,
        message: "Thành công"
      }
    };
  }

  async insert(
    obj: T
  ): Promise<{ inserted: boolean; statusResponse: IStatusResponse }> {
    if (!obj) {
      return {
        inserted: false,
        statusResponse: {
          status: true,
          message: "Không thành công"
        }
      };
    }

    const client = MongoDbHelper.getMongoClient();
    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);
      const result = await collection.insertOne(obj);

      if (result.insertedCount !== 1) {
        return {
          inserted: false,
          statusResponse: {
            status: false,
            message: "Đã có lỗi xảy ra, xin hãy thử lại"
          }
        };
      }
    } catch (err) {
      return {
        inserted: false,
        statusResponse: {
          status: false,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      inserted: true,
      statusResponse: {
        status: true,
        message: "Thành công"
      }
    };
  }
}
