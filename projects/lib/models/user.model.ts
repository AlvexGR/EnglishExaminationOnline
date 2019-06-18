import { BaseModel } from "./base.model";

export enum GenderType {
  male,
  female
}

export enum UserType {
  admin,
  user
}

export class User extends BaseModel {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  role: UserType;
  dateOfBirth: Date;

  constructor(id?: string) {
    super(id);
  }
}
