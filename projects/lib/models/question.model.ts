import { BaseModel } from "./base.model";
import { TagModel } from './tag.model';

export enum AnswerChoice {
  A,
  B,
  C,
  D
}

export enum QuestionType {
  multipleChoice,
  plainParagraph
}

export class QuestionModel extends BaseModel {
  index: number;
  content: string;
  questionType: QuestionType;
  questionNumber: number;
  choiceA: string;
  choiceB: string;
  choiceC: string;
  choiceD: string;
  answer: AnswerChoice;
  sectionId: string;
  tags: Array<TagModel>;
  tagIds: Array<string>;

  constructor(id?: string) {
    super(id);
  }
}
