import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ILogInExpressRequest } from "@lib/interfaces/express.interface";

const userLogInPrivateKey =
  "!EnglishOnlineTesting_UserLogIn_Authentication_PrivateKey!";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;
  const token = headers.authorization as string;

  if (!token) {
    return res.sendStatus(403).json({
      statusResponse: {
        message: "Đã có lỗi xảy ra, xin hãy thử lại",
        status: false
      }
    });
  }

  jwt.verify(
    token,
    userLogInPrivateKey,
    (err: jwt.VerifyErrors, authData: string | object) => {
      if (err) {
        return res.sendStatus(403).json({
          statusResponse: {
            message: "Đã có lỗi xảy ra, xin hãy thử lại",
            status: false
          }
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
        statusResponse: {
          message: "Đã có lỗi xảy ra, xin hãy thử lại",
          status: false
        }
      });
    }
    (req as ILogInExpressRequest).accessToken = token;
    next();
  });
}
