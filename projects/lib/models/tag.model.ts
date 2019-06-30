import { BaseModel } from "./base.model";

export class TagModel extends BaseModel {
  name: string;
  description: string;
  tagId: string;

  constructor(id?: string) {
    super(id);
  }
}
