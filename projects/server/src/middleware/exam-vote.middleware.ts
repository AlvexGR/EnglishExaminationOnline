import { Request, Response, NextFunction } from "express";
import { ExamVoteHandlerSingleton } from "../handlers/exam-vote.handler";
import { StatusCode } from "@lib/helpers/utility.helper";
import { Action } from "@lib/interfaces/exam-vote.interface";

const examVoteHandler = ExamVoteHandlerSingleton.getInstance();

export async function getAllExamVote(req: Request, res: Response) {
  const examId = req.params.examId;
  const userId = req.params.userId;
  const result = await examVoteHandler.getBy({ userId, examId });
  return res.status(result.statusResponse.status).json(result);
}

export async function insertOrUpdateExamVote(req: Request, res: Response) {
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
