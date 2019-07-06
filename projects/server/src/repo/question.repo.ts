import { BaseRepo } from './base.repo';
import { QuestionModel } from '@lib/models/question.model';
import { MongoDbHelper } from '@lib/helpers/mongoDb.helper';

export class QuestionRepo extends BaseRepo<QuestionModel> {
  constructor() {
    super(MongoDbHelper.questions);
  }
}
