import { User } from "../models/user.model";
import { IStatusResponse } from './base.interface';

export interface ILogInResponse {
  accessToken: string;
  user: User;
  statusResponse: IStatusResponse;
}

export interface ISignUpResponse {
  status: boolean;
  validation: {
    firstName: IStatusResponse;
    lastName: IStatusResponse;
    username: IStatusResponse;
    password: IStatusResponse;
    email: IStatusResponse;
    gender: IStatusResponse;
    dateOfBirth: IStatusResponse;
  };
}
