import { QuestionModel, AnswerChoice } from "@lib/models/question.model";
import { IStatusResponse } from "./base.interface";

export interface IQuestionsResponse {
  questions: Array<QuestionModel>;
  statusResponse: IStatusResponse;
}

export interface IAnswerChoice {
  questionId: string;
  answerChoice: AnswerChoice;
}
