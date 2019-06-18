import express, { Request, Response, NextFunction } from "express";
import { ILogInExpressRequest } from "@lib/interfaces/express.interface";
import {
  ILogInResponse,
  ISignUpResponse
} from "@lib/interfaces/user.interface";

import { UserHandler } from "../handlers/user.handler";
import {
  signToken,
  verifyToken
} from "../middleware/authentication.middleware";
import { HttpHelper } from "@lib/helpers/http.helper";
import { IStatusResponse } from "@lib/interfaces/base.interface";
import { StatusCode } from "@lib/helpers/utility.helper";

const router = express.Router();
const userHandler = new UserHandler();

// Log In
router.post(
  `/${HttpHelper.logIn}`,
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const verifyResult = await userHandler.verifyLogIn(
      body.username,
      body.password
    );
    console.log(verifyResult);
    if (verifyResult.statusResponse.status !== StatusCode.Ok) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: verifyResult.statusResponse,
        user: null
      };
      return res.status(StatusCode.InternalError).json(response);
    }

    if (!verifyResult.hasUser) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: verifyResult.statusResponse,
        user: null
      };
      return res.status(StatusCode.BadRequest).json(response);
    }

    const getByResult = await userHandler.getBy(
      { username: body.username, password: body.password },
      1
    );
    if (getByResult.statusResponse.status !== StatusCode.Ok) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: getByResult.statusResponse,
        user: null
      };
      return res.status(StatusCode.InternalError).json(response);
    }
    const logInUser = getByResult.users[0];
    if (!logInUser) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: {
          status: StatusCode.InternalError,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        },
        user: null
      };
      return res.status(StatusCode.InternalError).json(response);
    }

    (req as ILogInExpressRequest).user = logInUser;
    next();
  },
  signToken,
  (req: Request, res: Response) => {
    const result: ILogInResponse = {
      user: (req as ILogInExpressRequest).user,
      accessToken: (req as ILogInExpressRequest).accessToken,
      statusResponse: {
        status: StatusCode.Ok,
        message: "Đăng nhập thành công"
      }
    };
    return res.status(StatusCode.Ok).json(result);
  }
);

// Sign Up
router.post(`/`, async (req: Request, res: Response) => {
  const newUser = userHandler.createFromObj(req.body.user);

  const validateUserResult = await userHandler.validateNewUser(newUser);
  if (!validateUserResult.canInsert) {
    const signUpRes = validateUserResult.signUpResponse;
    if (!signUpRes.statusResponse.status) {
      return res.status(StatusCode.InternalError).json({
        statusResponse: signUpRes.statusResponse,
        validation: null
      });
    }
    return res.status(StatusCode.BadRequest).json(signUpRes);
  }

  const insertResult = await userHandler.insert(newUser);

  if (!insertResult.inserted) {
    const statusResult = insertResult.statusResponse;
    if (statusResult.status) {
      return res.status(StatusCode.BadRequest).json(statusResult);
    } else {
      return res.status(StatusCode.InternalError).json(statusResult);
    }
  }

  return res
    .status(StatusCode.Ok)
    .json({ statusResponse: insertResult.statusResponse, validation: null });
});

module.exports = router;
