import { BaseModel } from "./base.model";

export class HistoryModel extends BaseModel {
  testId: string;
  score: number;
  constructor(id?: string) {
    super(id);
  }
}
