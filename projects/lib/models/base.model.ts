import { v4 } from "uuid";

export class BaseModel {
  _id: string;
  constructor(id?: string) {
    this._id = id || v4();
  }
}
