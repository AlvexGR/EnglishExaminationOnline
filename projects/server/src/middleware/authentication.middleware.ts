import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ILogInExpressRequest } from "@lib/interfaces/express.interface";
import { StatusCode } from "@lib/helpers/utility.helper";

const userLogInPrivateKey =
  "!EnglishOnlineTesting_UserLogIn_Authentication_PrivateKey!";

export function verifyAccessToken(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;
  const token = headers.authorization as string;

  if (!token) {
    return res.status(StatusCode.Forbidden).json({
      statusResponse: {
        message: "Không có quyền để thực hiện, xin hãy thử lại",
        status: StatusCode.Forbidden
      }
    });
  }

  jwt.verify(
    token,
    userLogInPrivateKey,
    (err: jwt.VerifyErrors, authData: string | object) => {
      if (err) {
        return res.status(StatusCode.Forbidden).json({
          statusResponse: {
            message: "Không có quyền để thực hiện, xin hãy thử lại",
            status: StatusCode.Forbidden
          }
        });
      }
    }
  );
  next();
}

export function signAccessToken(req: Request, res: Response, next: NextFunction) {
  jwt.sign({}, userLogInPrivateKey, (err, token) => {
    if (err) {
      return res.status(StatusCode.InternalError).json({
        statusResponse: {
          message: "Đã có lỗi xảy ra, xin hãy thử lại",
          status: StatusCode.InternalError
        }
      });
    }
    (req as ILogInExpressRequest).accessToken = token;
    next();
  });
}
