import express, { Request, Response, NextFunction } from "express";
import { ExamVoteHandler } from "../handlers/exam-vote.handler";
import { verifyAccessToken } from "../middleware/authentication.middleware";
import { StatusCode } from "@lib/helpers/utility.helper";
import { Action } from "@lib/interfaces/exam-vote.interface";

const router = express.Router();
const examVoteHandler = new ExamVoteHandler();

// Get all
router.get(
  `/`,
  verifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await examVoteHandler.getAll();
    return res.status(result.statusResponse.status).json(result);
  }
);

// Get by id
router.get(
  `/:id`,
  verifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
      return res.status(StatusCode.BadRequest).json({
        status: StatusCode.BadRequest,
        message: `Invalid: ${id}`
      });
    }

    const result = await examVoteHandler.getById(id);
    return res.status(result.statusResponse.status).json(result);
  }
);

// Insert or update or delete
// Depends on the data
router.post(
  `/`,
  verifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!body) {
      return res.status(StatusCode.BadRequest).json({
        like: null,
        dislike: null,
        statusResponse: {
          status: StatusCode.BadRequest,
          message: `Invalid: ${body}`
        }
      });
    }

    const actionResult = await examVoteHandler.getAction(body);
    if (actionResult.statusResponse.status !== StatusCode.Ok) {
      return res.status(actionResult.statusResponse.status).json({
        like: null,
        dislike: null,
        statusResponse: actionResult.statusResponse
      });
    }

    let result: any;
    switch (actionResult.action) {
      case Action.insert:
        result = await examVoteHandler.insert(body);
        break;
      case Action.update:
        result = await examVoteHandler.update(body);
        break;
      case Action.delete:
        result = await examVoteHandler.delete(body);
        break;
    }

    return res.status(result.statusResponse.status).json(result);
  }
);

module.exports = router;
