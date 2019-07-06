import { ExamModel } from "@lib/models/exam.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";
import { BaseRepo } from './base.repo';

export class ExamRepo extends BaseRepo<ExamModel> {
  constructor() {
    super(MongoDbHelper.exams);
  }
}
