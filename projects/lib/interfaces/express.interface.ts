import { Request } from "express";
import { UserModel } from '@lib/models/user.model';
import { ExamModel } from '@lib/models/exam.model';
import { ExamVoteModel } from '@lib/models/exam-vote.model';
import { IStatusResponse } from './base.interface';

export interface ILogInExpressRequest extends Request {
  user: UserModel;
  accessToken: string;
}

export interface ISimpleExamsRequest extends Request {
  exams: Array<ExamModel>;
  votes: Array<ExamVoteModel>;
  statusResponse: IStatusResponse;
}
