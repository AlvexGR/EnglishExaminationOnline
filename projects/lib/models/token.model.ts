import { BaseModel } from "./base.model";

export class TokenModel extends BaseModel {
  token: string;

  constructor(id?: string) {
    super(id);
  }
}
