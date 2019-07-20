import { ExamVoteModel } from "@lib/models/exam-vote.model";
import { IStatusResponse } from "./base.interface";

export interface IExamVotesResponse {
  examVotes: Array<ExamVoteModel>;
  statusResponse: IStatusResponse;
}

export interface IExamVoteResponse {
  examVote: ExamVoteModel;
  statusResponse: IStatusResponse;
}

export enum Action {
  insert,
  delete,
  update
}

export interface IAction {
  action: Action;
  statusResponse: IStatusResponse;
}
