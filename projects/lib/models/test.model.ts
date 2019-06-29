import { BaseModel } from "./base.model";
import { Section } from './section.model';

export class Test extends BaseModel {
  title: string;
  subtitle: string;
  content: string;
  time: number; // total minute
  difficulty: number;
  sections: Array<Section>;

  constructor(id?: string) {
    super(id);
  }
}
