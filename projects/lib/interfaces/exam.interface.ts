import { ExamModel } from "@lib/models/exam.model";
import { IStatusResponse } from "./base.interface";

export interface IExamResponse {
  exam: ExamModel;
  statusResponse: IStatusResponse;
}

export interface ISimpleExamsResponse {
  exams: Array<ExamModel>;
  statusResponse: IStatusResponse;
}
