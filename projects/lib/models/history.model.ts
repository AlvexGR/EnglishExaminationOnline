import { BaseModel } from "./base.model";

export class HistoryModel extends BaseModel {
  testId: string;
  score: number;
  date: Date;
  constructor(id?: string) {
    super(id);
  }
}
