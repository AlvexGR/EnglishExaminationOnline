import { Request } from "express";
import { UserModel } from '@lib/models/user.model';

export interface ILogInExpressRequest extends Request {
  user: UserModel;
  accessToken: string;
}
