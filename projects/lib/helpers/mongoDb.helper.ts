import { MongoClient } from "mongodb";

export class MongoDbHelper {
  static readonly connectionString = "mongodb://localhost:27017/";
  static readonly databaseName = "EnglishOnlineTesting";

  // Collections
  static readonly users = "Users";
  static readonly invalidatedTokens = "InvalidatedTokens";
  static readonly exams = "Exams";
  static readonly sections = "Sections";
  static readonly questions = "Questions";
  static readonly tags = "Tags";
  static readonly histories = "Histories";
  static readonly examVotes = "ExamVotes";

  static getMongoClient(): MongoClient {
    return new MongoClient(this.connectionString, {
      useNewUrlParser: true
    });
  }
}
