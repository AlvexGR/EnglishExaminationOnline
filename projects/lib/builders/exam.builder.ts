import { ExamModel } from "@lib/models/exam.model";
import { SectionModel } from "@lib/models/section.model";

export class ExamBuilder {
  private _exam: ExamModel;

  constructor(id?: string) {
    this._exam = new ExamModel(id);
  }

  withIndex(index: number): ExamBuilder {
    this._exam.index = index;
    return this;
  }

  withTitle(title: string): ExamBuilder {
    this._exam.title = title;
    return this;
  }

  withSubtitle(subtitle: string): ExamBuilder {
    this._exam.subtitle = subtitle;
    return this;
  }

  withContent(content: string): ExamBuilder {
    this._exam.content = content;
    return this;
  }

  withTime(time: number): ExamBuilder {
    this._exam.time = time;
    return this;
  }

  withDifficulty(difficulty: number): ExamBuilder {
    this._exam.difficulty = difficulty;
    return this;
  }

  withSections(sections: Array<SectionModel>): ExamBuilder {
    this._exam.sections = sections;
    return this;
  }

  withSectionIds(ids: Array<string>): ExamBuilder {
    this._exam.sectionIds = ids;
    return this;
  }

  withLike(like: number): ExamBuilder {
    this._exam.like = like;
    return this;
  }

  withDislike(dislike: number): ExamBuilder {
    this._exam.dislike = dislike;
    return this;
  }

  build(): ExamModel {
    return this._exam;
  }
}
