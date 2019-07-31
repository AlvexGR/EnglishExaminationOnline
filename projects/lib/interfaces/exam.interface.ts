import { ExamModel } from "@lib/models/exam.model";
import { IStatusResponse } from "./base.interface";
import { Action } from './exam-vote.interface';
import { ExamVoteModel } from '@lib/models/exam-vote.model';

export interface IExamResponse {
  exam: ExamModel;
  statusResponse: IStatusResponse;
}

export interface ISimpleExamsResponse {
  exams: Array<ExamModel>;
  votes: Array<ExamVoteModel>;
  statusResponse: IStatusResponse;
}

export interface ILikeAndDislikeResponse {
  like: number;
  dislike: number;
  action: Action;
  statusResponse: IStatusResponse;
}
