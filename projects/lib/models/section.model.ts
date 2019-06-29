import { BaseModel } from './base.model';
import { Question } from './question.model';

export class Section extends BaseModel {
  index: number;
  title: string;
  questions: Array<Question>;
  testId: string;

  constructor(id?: string) {
    super(id);
  }
}
