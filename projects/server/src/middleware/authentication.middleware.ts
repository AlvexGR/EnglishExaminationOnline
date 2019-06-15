import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RequestCustom } from '../../../lib/interfaces/express.interface';

const userLogInPrivateKey = "!EnglishOnlineTesting_UserLogIn_Authentication_PrivateKey!";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;
  const token = headers.authorization as string;
  if (!token) {
    return res.sendStatus(403).json({
      message: "You don't have the authorization to perform this action",
      status: "Not Ok"
    });
  }
  jwt.verify(
    token,
    userLogInPrivateKey,
    (err: jwt.VerifyErrors, authData: string | object) => {
      if (err) {
        return res.sendStatus(403).json({
          message: "You're token is incorrect",
          status: "Not Ok"
        });
      }
    }
  );
  next();
}

export function signToken(req: Request, res: Response, next: NextFunction) {
  jwt.sign({}, userLogInPrivateKey, (err, token) => {
    if (err) {
      return res.sendStatus(500).json({
        message: "Something went wrong. Please try again!",
        status: "Not Ok"
      });
    }
    (req as RequestCustom).accessToken = token;
    next();
  });
}
