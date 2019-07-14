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
import { TokenHandler } from "../handlers/token.handler";

const router = express.Router();
const userHandler = new UserHandler();
const tokenHandler = new TokenHandler();

// Log In
router.post(
  `/${HttpHelper.logIn}`,
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const result = await userHandler.getBy(
      { username: body.username, password: body.password },
      1
    );
    if (result.statusResponse.status !== StatusCode.Ok) {
      return res
        .status(result.statusResponse.status)
        .json(result.statusResponse);
    }

    const logInUser = result.users[0];
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
  // Validate new user
  const validateUserResult = await userHandler.validateNewUser(req.body.user);

  // Return if can't insert
  if (!validateUserResult.canInsert) {
    const signUpRes = validateUserResult.signUpResponse;
    return res.status(signUpRes.statusResponse.status).json(signUpRes);
  }

  // Insert new user to db
  const result = await userHandler.insert(req.body.user);
  return res.status(result.status).json(result);
});

// Update
router.put(`/`, verifyAccessToken, async (req: Request, res: Response) => {
  const updatedUser = req.body.user;
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
  const result = await userHandler.getById(req.params.id);

  return res.status(result.statusResponse.status).json({
    statusResponse: result.statusResponse,
    user: result.user
  });
});

// Log out
router.post(`/${HttpHelper.logOut}`, async (req: Request, res: Response) => {
  const result = await tokenHandler.insert(req.body.token);
  return res.status(result.status).json(result);
});

module.exports = router;
