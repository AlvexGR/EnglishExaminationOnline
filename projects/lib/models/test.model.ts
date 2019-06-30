import { BaseModel } from "./base.model";
import { SectionModel } from './section.model';

export class TestModel extends BaseModel {
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
}
