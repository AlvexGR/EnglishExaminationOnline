import { Request, Response, NextFunction } from "express";
import { UserHandlerSingleton } from "../handlers/user.handler";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ILogInExpressRequest } from "@lib/interfaces/express.interface";
import { ILogInResponse } from "@lib/interfaces/user.interface";
import { TokenHandlerSingleton } from "../handlers/token.handler";

const userHandler = UserHandlerSingleton.getInstance();
const tokenHandler = TokenHandlerSingleton.getInstance();

export async function getUserByUsernamePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body;
  const result = await userHandler.getBy(
    { username: body.username, password: body.password },
    1
  );
  if (result.statusResponse.status !== StatusCode.Ok) {
    return res.status(result.statusResponse.status).json(result.statusResponse);
  }

  const logInUser = result.users[0];
  (req as ILogInExpressRequest).user = logInUser;
  next();
}

export function assignUserLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export async function validateNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Validate new user
  const validateUserResult = await userHandler.validateNewUser(req.body.user);

  // Return if can't insert
  if (!validateUserResult.canInsert) {
    const signUpRes = validateUserResult.signUpResponse;
    return res.status(signUpRes.statusResponse.status).json(signUpRes);
  }

  next();
}

export async function insertNewUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Insert new user to db
  const result = await userHandler.insert(req.body.user);
  return res.status(result.status).json(result);
}

export async function verifyUpdateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

  next();
}

export async function updateUser(req: Request, res: Response) {
  const updatedUser = req.body.user;
  const updateResult = await userHandler.update(updatedUser);
  return res.status(updateResult.statusResponse.status).json(updateResult);
}

export async function getUserById(req: Request, res: Response) {
  const result = await userHandler.getById(req.params.id);

  return res.status(result.statusResponse.status).json({
    statusResponse: result.statusResponse,
    user: result.user
  });
}

export async function logOut(req: Request, res: Response) {
  const result = await tokenHandler.insert(req.body.token);
  return res.status(result.status).json(result);
}
