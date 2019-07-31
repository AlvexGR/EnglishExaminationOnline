import { Request, Response, NextFunction } from "express";
import { ExamHandlerSingleton } from "../handlers/exam.handler";
import { StatusCode } from "@lib/helpers/utility.helper";
import { ISimpleExamsRequest } from "@lib/interfaces/express.interface";
import { ExamVoteHandlerSingleton } from "../handlers/exam-vote.handler";

const examHandler = ExamHandlerSingleton.getInstance();
const examVoteHandler = ExamVoteHandlerSingleton.getInstance();
export async function getAllSimpleExam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = await examHandler.getAllSimple();
  if (result.statusResponse.status !== StatusCode.Ok) {
    return res.status(result.statusResponse.status).json(result.statusResponse);
  }
  (req as ISimpleExamsRequest).exams = result.exams;
  (req as ISimpleExamsRequest).statusResponse = result.statusResponse;
  next();
}

export async function getExamVoteByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = await examVoteHandler.getBy({ userId: req.params.userId });
  if (result.statusResponse.status === StatusCode.Ok) {
    (req as ISimpleExamsRequest).votes = result.examVotes;
  }
  next();
}

export async function getExamById(req: Request, res: Response) {
  const result = await examHandler.getById(req.params.id);
  return res.status(result.statusResponse.status).json(result);
}

export async function insertExam(req: Request, res: Response) {
  const result = await examHandler.insert(req.body);
  return res.status(result.status).json(result);
}

export async function updateExam(req: Request, res: Response) {
  // const result = await examHandler.update();
  // return res.status(result.status).json(result);
}

export async function deleteExam(req: Request, res: Response) {
  const result = await examHandler.delete(req.params.id);
  return res.status(result.status).json(result);
}
