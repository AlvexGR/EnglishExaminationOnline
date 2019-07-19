import { ExamVoteModel, Vote } from "@lib/models/exam-vote.model";

export class ExamVoteBuilder {
  private _examVote: ExamVoteModel;

  constructor(id?: string) {
    this._examVote = new ExamVoteModel(id);
  }

  withUserId(id: string): ExamVoteBuilder {
    this._examVote.userId = id;
    return this;
  }

  withExamId(id: string): ExamVoteBuilder {
    this._examVote.examId = id;
    return this;
  }

  withVote(vote: Vote): ExamVoteBuilder {
    this._examVote.vote = vote;
    return this;
  }

  build(): ExamVoteModel {
    return this._examVote;
  }
}
