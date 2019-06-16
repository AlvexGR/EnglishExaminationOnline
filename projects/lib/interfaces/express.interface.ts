import { Request } from "express";
import { User } from "projects/lib/models/user.model";

export interface ILogInExpressRequest extends Request {
  user: User;
  accessToken: string;
}
