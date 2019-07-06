import { SectionModel } from "@lib/models/section.model";
import { QuestionModel } from "@lib/models/question.model";

export class SectionBuilder {
  private _section: SectionModel;

  constructor(id?: string) {
    this._section = new SectionModel(id);
  }

  withIndex(index: number): SectionBuilder {
    this._section.index = index;
    return this;
  }

  withTitle(title: string): SectionBuilder {
    this._section.title = title;
    return this;
  }

  withQuestions(questions: Array<QuestionModel>): SectionBuilder {
    this._section.questions = questions;
    return this;
  }

  withQuestionIds(ids: Array<string>): SectionBuilder {
    this._section.questionIds = ids;
    return this;
  }

  withExamId(id: string): SectionBuilder {
    this._section.examId = id;
    return this;
  }

  build(): SectionModel {
    return this._section;
  }
}
