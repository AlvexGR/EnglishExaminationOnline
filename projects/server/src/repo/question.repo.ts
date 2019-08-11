import { BaseRepo } from './base.repo';
import { QuestionModel } from '@lib/models/question.model';
import { MongoDbHelper } from '@lib/helpers/mongoDb.helper';

export class QuestionRepoSingleton {
  private static _questionRepo: QuestionRepo;

  static getInstance(): QuestionRepo {
    if (!this._questionRepo) {
      this._questionRepo = new QuestionRepo();
    }
    return this._questionRepo;
  }
}

export class QuestionRepo extends BaseRepo<QuestionModel> {
  constructor() {
    super(MongoDbHelper.questions);
  }
}
