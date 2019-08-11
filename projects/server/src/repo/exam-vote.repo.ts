import { BaseRepo } from "./base.repo";
import { ExamVoteModel } from "@lib/models/exam-vote.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class ExamVoteRepoSingleton {
  private static _examVoteRepo: ExamVoteRepo;

  static getInstance(): ExamVoteRepo {
    if (!this._examVoteRepo) {
      this._examVoteRepo = new ExamVoteRepo();
    }
    return this._examVoteRepo;
  }
}

export class ExamVoteRepo extends BaseRepo<ExamVoteModel> {
  constructor() {
    super(MongoDbHelper.examVotes);
  }
}
