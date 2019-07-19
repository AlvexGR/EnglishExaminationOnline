import { BaseRepo } from "./base.repo";
import { ExamVoteModel } from "@lib/models/exam-vote.model";
import { MongoDbHelper } from "@lib/helpers/mongoDb.helper";

export class ExamVoteRepo extends BaseRepo<ExamVoteModel> {
  constructor() {
    super(MongoDbHelper.examVotes);
  }
}
