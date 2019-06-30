import { MongoClient } from "mongodb";

export class MongoDbHelper {
  static connectionString = "mongodb://localhost:27017/";
  static databaseName = "EnglishOnlineTesting";

  // Collections
  static users = "Users";
  static invalidatedTokens = "InvalidatedTokens";
  static tests = "Tests";
  static sections = "Sections";
  static questions = "Questions";
  static tags = "Tags";

  static getMongoClient(): MongoClient {
    return new MongoClient(this.connectionString, {
      useNewUrlParser: true
    });
  }
}
