import { BaseModel } from './base.model';
import { QuestionModel } from './question.model';

export class SectionModel extends BaseModel {
  index: number;
  title: string;
  questions: Array<QuestionModel>;
  questionIds: Array<string>;
  examId: string;

  constructor(id?: string) {
    super(id);
  }
}
