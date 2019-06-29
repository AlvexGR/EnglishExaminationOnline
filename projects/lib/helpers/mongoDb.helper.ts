import { MongoClient } from "mongodb";

export class MongoDbHelper {
  static connectionString = "mongodb://localhost:27017/";
  static databaseName = "EnglishOnlineTesting";

  // Collections
  static users = "Users";
  static invalidatedTokens = "InvalidatedTokens";

  static getMongoClient(): MongoClient {
    return new MongoClient(this.connectionString, {
      useNewUrlParser: true
    });
  }
}
