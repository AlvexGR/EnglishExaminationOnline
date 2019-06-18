import { User } from "@lib/models/user.model";
import { IStatusResponse } from "./base.interface";

export interface ILogInResponse {
  accessToken: string;
  user: User;
  statusResponse: IStatusResponse;
}

export interface ISignUpResponse {
  statusResponse: IStatusResponse;
  validation: {
    usernameValid: boolean;
    emailValid: boolean;
  };
}
