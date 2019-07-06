import { ExamModel } from "@lib/models/exam.model";
import { SectionModel } from "@lib/models/section.model";

export class ExamBuilder {
  private _test: ExamModel;

  constructor(id?: string) {
    this._test = new ExamModel(id);
  }

  withIndex(index: number): ExamBuilder {
    this._test.index = index;
    return this;
  }

  withTitle(title: string): ExamBuilder {
    this._test.title = title;
    return this;
  }

  withSubtitle(subtitle: string): ExamBuilder {
    this._test.subtitle = subtitle;
    return this;
  }

  withContent(content: string): ExamBuilder {
    this._test.content = content;
    return this;
  }

  withTime(time: number): ExamBuilder {
    this._test.time = time;
    return this;
  }

  withDifficulty(difficulty: number): ExamBuilder {
    this._test.difficulty = difficulty;
    return this;
  }

  withSections(sections: Array<SectionModel>): ExamBuilder {
    this._test.sections = sections;
    return this;
  }

  withSectionIds(ids: Array<string>): ExamBuilder {
    this._test.sectionIds = ids;
    return this;
  }

  build(): ExamModel {
    return this._test;
  }
}
