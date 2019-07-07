import { BaseModel } from "./base.model";
import { SectionModel } from './section.model';
import { QuestionType } from './question.model';

export class ExamModel extends BaseModel {
  title: string;
  index: number;
  subtitle: string;
  content: string;
  time: number; // total minutes
  difficulty: number;
  sections: Array<SectionModel>;
  sectionIds: Array<string>;

  constructor(id?: string) {
    super(id);
  }

  getTotalQuestions(): number {
    const result = this.sections
      .map(section => section.questions)
      .map(
        questions =>
          questions.filter(
            question => question.questionType !== QuestionType.plainParagraph
          ).length
      )
      .reduce((a, b) => a + b);

    return result;
  }
}
