import { BaseModel } from "@lib/models/base.model";
import { FilterQuery } from "mongodb";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class BaseRepo<T extends BaseModel> {
  protected readonly collectionName: string;
  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async getBy(
    query: FilterQuery<any>,
    limit: number = 50
  ): Promise<{
    docs: Array<any>;
    statusResponse: IStatusResponse;
  }> {
    let results: Array<any> = null;
    const client = MongoDbHelper.getMongoClient();
    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);
      const cursor = await collection.find(query);

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
}
