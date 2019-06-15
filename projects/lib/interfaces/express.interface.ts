import { Request } from "express";
import { User } from "projects/lib/models/user.model";

export interface RequestCustom extends Request {
  user?: User;
  accessToken?: string;
}
