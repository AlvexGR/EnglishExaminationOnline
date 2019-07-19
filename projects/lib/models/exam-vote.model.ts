import { BaseModel } from "./base.model";

export enum Vote {
  like,
  dislike
}

export class ExamVoteModel extends BaseModel {
  userId: string;
  examId: string;
  vote: Vote;

  constructor(id?: string) {
    super(id);
  }
}
