import { BaseModel } from "./base.model";
import { ExamModel } from './exam.model';

export class HistoryModel extends BaseModel {
  examId: string;
  exam: ExamModel;
  answers: Map<string, boolean>;
  date: Date;
  constructor(id?: string) {
    super(id);
  }
}
