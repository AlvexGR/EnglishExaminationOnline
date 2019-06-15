import { BaseModel } from "./base.model";

export class GenderType {
  static male = "male";
  static female = "female";
}

export class UserType {
  static admin = "admin";
  static user = "user";
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
