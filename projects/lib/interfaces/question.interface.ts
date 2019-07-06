import { QuestionModel } from "@lib/models/question.model";
import { IStatusResponse } from "./base.interface";

export interface IQuestionsResponse {
  questions: Array<QuestionModel>;
  statusResponse: IStatusResponse;
}
