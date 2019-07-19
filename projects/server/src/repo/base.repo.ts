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
    _id: string,
    projection?: any
  ): Promise<{
    doc: T;
    statusResponse: IStatusResponse;
  }> {
    if (!_id) {
      return {
        doc: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${_id}`
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

      result = await collection.findOne<T>({ _id }, { projection });
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
        status: result ? StatusCode.Ok : StatusCode.BadRequest,
        message: result ? "Thành công" : "Không có dữ liệu"
      }
    };
  }

  async getByIds(
    ids: Array<string>,
    projection?: any
  ): Promise<{
    docs: Array<T>;
    statusResponse: IStatusResponse;
  }> {
    if (!ids) {
      return {
        docs: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${ids}`
        }
      };
    }

    let results: Array<T> = null;
    const client = MongoDbHelper.getMongoClient();

    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);

      const cursor = await collection.find<T>({ _id: { $in: ids } });

      cursor.project(projection);

      results = await cursor.toArray();
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
        status:
          results.length === ids.length ? StatusCode.Ok : StatusCode.BadRequest,
        message:
          results.length === ids.length ? "Thành công" : "Không có dữ liệu"
      }
    };
  }

  async getBy(
    query: FilterQuery<any>,
    limit: number = 50,
    projection?: any
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

      cursor.limit(limit).project(projection);

      results = await cursor.toArray();
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
        status: results.length > 0 ? StatusCode.Ok : StatusCode.BadRequest,
        message: results.length > 0 ? "Thành công" : "Không có dữ liệu"
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

  async insertOne(obj: T): Promise<IStatusResponse> {
    if (!obj) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${JSON.stringify(obj)}`
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
      console.log(
        `Obj: ${JSON.stringify(obj)} causes insert one failed: ${err}`
      );
      return {
        status: StatusCode.InternalError,
        message: "Đã có lỗi xảy ra, xin hãy thử lại"
      };
    } finally {
      client.close();
    }

    return {
      status: StatusCode.Ok,
      message: "Thành công"
    };
  }

  async insertMany(obj: Array<T>): Promise<IStatusResponse> {
    if (!obj || obj.length === 0) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${JSON.stringify(obj)}`
      };
    }

    const client = MongoDbHelper.getMongoClient();
    try {
      // Connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);
      await collection.insertMany(obj);
    } catch (err) {
      console.log(
        `Obj: ${JSON.stringify(obj)} causes insert many failed: ${err}`
      );
      return {
        status: StatusCode.InternalError,
        message: "Đã có lỗi xảy ra, xin hãy thử lại"
      };
    } finally {
      client.close();
    }

    return {
      status: StatusCode.Ok,
      message: "Thành công"
    };
  }

  async updateOne(obj: T): Promise<IStatusResponse> {
    if (!obj || !obj._id) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${JSON.stringify(obj)}`
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
        status: StatusCode.InternalError,
        message: "Đã có lỗi xảy ra, xin hãy thử lại"
      };
    } finally {
      client.close();
    }

    return {
      status: StatusCode.Ok,
      message: "Thành công"
    };
  }

  async deleteById(_id: string): Promise<IStatusResponse> {
    if (!_id) {
      return {
        status: StatusCode.BadRequest,
        message: `Invalid: ${_id}`
      };
    }

    const client = MongoDbHelper.getMongoClient();
    try {
      // connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);

      await collection.deleteOne({ _id });
    } catch (error) {
      console.log(`id: ${_id} causes delete failed: ${error}`);
      return {
        status: StatusCode.InternalError,
        message: "Đã có lỗi xảy ra. Xin hãy thử lại"
      };
    } finally {
      client.close();
    }

    return {
      status: StatusCode.Ok,
      message: ""
    };
  }

  async deleteMany(query: FilterQuery<any>): Promise<IStatusResponse> {
    const client = MongoDbHelper.getMongoClient();
    try {
      // connect to Mongo server
      await client.connect();

      const collection = client
        .db(MongoDbHelper.databaseName)
        .collection(this.collectionName);

      await collection.deleteMany(query);
    } catch (error) {
      console.log(`Query: ${query} causes delete failed: ${error}`);
      return {
        status: StatusCode.InternalError,
        message: "Đã có lỗi xảy ra. Xin hãy thử lại"
      };
    } finally {
      client.close();
    }

    return {
      status: StatusCode.Ok,
      message: ""
    };
  }
}
