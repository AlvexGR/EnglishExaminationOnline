import express, { Request, Response } from "express";
import { HttpHelper } from "@lib/helpers/http.helper";
import { verifyAccessToken } from "../middleware/authentication.middleware";
import {
  getAllSimpleExam,
  getExamById,
  insertExam,
  updateExam,
  deleteExam,
  getExamVoteByUserId
} from "../middleware/exam.middleware";
import { ISimpleExamsRequest } from "@lib/interfaces/express.interface";
import { ISimpleExamsResponse } from "@lib/interfaces/exam.interface";

const router = express.Router();

router.get(
  `/${HttpHelper.simpleExams}/:userId`,
  getAllSimpleExam,
  getExamVoteByUserId,
  (req: Request, res: Response) => {
    const result = req as ISimpleExamsRequest;
    const simpleExamsResponse: ISimpleExamsResponse = {
      exams: result.exams,
      statusResponse: result.statusResponse,
      votes: result.votes
    };

    return res.status(result.statusResponse.status).json(simpleExamsResponse);
  }
);

router.get("/:id", verifyAccessToken, getExamById);

router.post(`/`, verifyAccessToken, insertExam);

router.put(`/`, verifyAccessToken, updateExam);

router.delete(`/:id`, verifyAccessToken, deleteExam);

module.exports = router;
