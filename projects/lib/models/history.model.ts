import { BaseModel } from "./base.model";
import { ExamModel } from './exam.model';
import { ICorrectChoice } from '@lib/interfaces/question.interface';

export class HistoryModel extends BaseModel {
  userId: string;
  examId: string;
  exam: ExamModel;
  answers: Map<string, ICorrectChoice>;
  date: Date;
  constructor(id?: string) {
    super(id);
  }
}
