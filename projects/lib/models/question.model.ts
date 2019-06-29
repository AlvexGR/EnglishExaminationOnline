import { BaseModel } from './base.model';

export enum AnswerChoice {
  A, B, C, D
}

export enum QuestionType {
  multipleChoice,
  plainParagraph
}

export class Question extends BaseModel {
  index: number;
  content: string;
  questionType: QuestionType;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  answer: AnswerChoice;
  sectionId: string;
  tags: Array<string>;

  constructor(id?: string) {
    super(id);
  }
}
