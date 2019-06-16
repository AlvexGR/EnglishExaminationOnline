import express, { Request, Response, NextFunction } from "express";
import { ILogInExpressRequest } from "./../../../lib/interfaces/express.interface";
import { ILogInResponse } from "./../../../lib/interfaces/user.interface";

import { UserHandler } from "../handlers/user.handler";
import {
  signToken,
  verifyToken
} from "../middleware/authentication.middleware";
import { HttpHelper } from '@lib/helpers/http.helper';

const router = express.Router();
const userHandler = new UserHandler();

// Login
router.post(
  `/${HttpHelper.logIn}`,
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const verifyResult = await userHandler.verifyLogIn(
      body.username,
      body.password
    );

    if (!verifyResult.statusResponse.status) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: verifyResult.statusResponse,
        user: null
      };
      return res.status(500).json({ response });
    }

    if (!verifyResult.hasUser) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: verifyResult.statusResponse,
        user: null
      };
      return res.status(400).json({ response });
    }

    const getByResult = await userHandler.getBy(
      { username: body.username, password: body.password },
      1
    );
    if (!getByResult.statusResponse.status) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: getByResult.statusResponse,
        user: null
      };
      return res.status(500).json({ response });
    }
    const logInUser = getByResult.users[0];
    if (!logInUser) {
      const response: ILogInResponse = {
        accessToken: null,
        statusResponse: {
          status: false,
          message: "Đã có lỗi xảy ra, xin hãy thử lại"
        },
        user: null
      };
      return res.status(500).json({ response });
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
        status: true,
        message: "Đăng nhập thành công"
      }
    };
    return res.status(200).json({ result });
  }
);

module.exports = router;
