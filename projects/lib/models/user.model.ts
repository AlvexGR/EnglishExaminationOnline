import { BaseModel } from "./base.model";

export class GenderType {
  static readonly male = "male";
  static readonly female = "female";
}

export class UserType {
  static readonly admin = "admin";
  static readonly user = "user";
}

export class User extends BaseModel {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  role: string;
  dateOfBirth: Date;

  constructor(id?: string) {
    super(id);
  }
}
