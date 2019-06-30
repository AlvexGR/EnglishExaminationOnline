import { TestModel } from "@lib/models/test.model";
import { SectionModel } from "@lib/models/section.model";

export class TestBuilder {
  private _test: TestModel;

  constructor(id?: string) {
    this._test = new TestModel(id);
  }

  withIndex(index: number): TestBuilder {
    this._test.index = index;
    return this;
  }

  withTitle(title: string): TestBuilder {
    this._test.title = title;
    return this;
  }

  withSubtitle(subtitle: string): TestBuilder {
    this._test.subtitle = subtitle;
    return this;
  }

  withContent(content: string): TestBuilder {
    this._test.content = content;
    return this;
  }

  withTime(time: number): TestBuilder {
    this._test.time = time;
    return this;
  }

  withDifficulty(difficulty: number): TestBuilder {
    this._test.difficulty = difficulty;
    return this;
  }

  withSections(sections: Array<SectionModel>): TestBuilder {
    this._test.sections = sections;
    return this;
  }

  withSectionIds(ids: Array<string>): TestBuilder {
    this._test.sectionIds = ids;
    return this;
  }

  build(): TestModel {
    return this._test;
  }
}
