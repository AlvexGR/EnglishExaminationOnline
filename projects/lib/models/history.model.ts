import { BaseModel } from "./base.model";
import { ExamModel } from "./exam.model";
import { IAnswer, IChoice } from "@lib/interfaces/question.interface";
import { UtilityFunctions } from "@lib/helpers/utility.helper";

export class HistoryModel extends BaseModel {
  userId: string;
  examId: string;
  exam: ExamModel;
  answers: Array<IAnswer>;
  date: Date;
  totalQuestions: number;
  correctAnswers: number;
  constructor(id?: string) {
    super(id);
  }

  getAnswersMap(): Map<string, IChoice> {
    return UtilityFunctions.arrayToMap(
      this.answers.map(answer => {
        return {
          key: answer.id,
          values: answer.choice
        };
      })
    );
  }

  getAnswerArray(answers: Map<string, IChoice>): Array<IAnswer> {
    return UtilityFunctions.mapToArray(answers).map(raw => {
      return {
        id: raw.key,
        choice: raw.values
      };
    });
  }
}
