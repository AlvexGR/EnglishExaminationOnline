import express, { Request, Response, NextFunction } from "express";
import { ILogInExpressRequest } from "@lib/interfaces/express.interface";
import { ILogInResponse } from "@lib/interfaces/user.interface";

import { UserHandler } from "../handlers/user.handler";
import {
  signAccessToken,
  verifyAccessToken
} from "../middleware/authentication.middleware";
import { HttpHelper } from "@lib/helpers/http.helper";
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
  signAccessToken,
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

// Update
router.put(`/`, verifyAccessToken, async (req: Request, res: Response) => {
  const updatedUser = userHandler.createFromObj(req.body.user);
  const currentUserId = req.body.currentUserId;
  const inputPassword = req.body.inputPassword;
  const validateResult = await userHandler.validateUpdateUser(
    currentUserId,
    inputPassword,
    updatedUser
  );

  if (!validateResult.canUpdate) {
    return res
      .status(validateResult.updateResponse.statusResponse.status)
      .json(validateResult.updateResponse);
  }

  const updateResult = await userHandler.update(updatedUser);
  return res.status(updateResult.statusResponse.status).json(updateResult);
});

// Get by Id
router.get(`/:id`, verifyAccessToken, async (req: Request, res: Response) => {
  const result = await userHandler.getBy({ _id: req.params.id }, 1);

  return res.status(result.statusResponse.status).json({
    statusResponse: result.statusResponse,
    user: result.users && result.users[0]
  });
});

module.exports = router;
