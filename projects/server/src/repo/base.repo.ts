import { BaseModel } from "@lib/models/base.model";
import { FilterQuery } from "mongodb";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";
import { StatusCode } from "@lib/helpers/utility.helper";

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
          status: StatusCode.BadRequest,
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
          status: StatusCode.InternalError,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      doc: result,
      statusResponse: {
        status: StatusCode.Ok,
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
          status: StatusCode.InternalError,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      docs: results,
      statusResponse: {
        status: StatusCode.Ok,
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
          status: StatusCode.InternalError,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      total: result,
      statusResponse: {
        status: StatusCode.Ok,
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
          status: StatusCode.BadRequest,
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
      await collection.insertOne(obj);
    } catch (err) {
      return {
        inserted: false,
        statusResponse: {
          status: StatusCode.InternalError,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      inserted: true,
      statusResponse: {
        status: StatusCode.Ok,
        message: "Thành công"
      }
    };
  }

  async update(
    obj: T
  ): Promise<{ updated: boolean; statusResponse: IStatusResponse }> {
    if (!obj) {
      return {
        updated: false,
        statusResponse: {
          status: StatusCode.BadRequest,
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
      await collection.updateOne({ _id: obj._id }, { $set: obj });
    } catch (err) {
      return {
        updated: false,
        statusResponse: {
          status: StatusCode.InternalError,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        }
      };
    } finally {
      client.close();
    }

    return {
      updated: true,
      statusResponse: {
        status: StatusCode.Ok,
        message: "Thành công"
      }
    };
  }
}
