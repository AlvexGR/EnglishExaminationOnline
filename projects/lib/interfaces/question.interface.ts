import { QuestionModel, AnswerChoice } from "@lib/models/question.model";
import { IStatusResponse } from "./base.interface";

export interface IQuestionsResponse {
  questions: Array<QuestionModel>;
  statusResponse: IStatusResponse;
}

export interface IChoice {
  questionId: string;
  selectedChoice: AnswerChoice;
  isCorrect: boolean;
}

export interface IAnswer {
  id: string;
  choice: IChoice;
}
