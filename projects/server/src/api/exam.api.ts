import express, { Request, Response, NextFunction } from "express";
import { ExamHandler } from "../handlers/exam.handler";
import { HttpHelper } from "@lib/helpers/http.helper";
import { verifyAccessToken } from "../middleware/authentication.middleware";

const router = express.Router();
const examHandler = new ExamHandler();

// Get all simple
router.get(
  `/${HttpHelper.simpleExams}`,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await examHandler.getAllSimple();
    return res.status(result.statusResponse.status).json(result);
  }
);

// Get by id
router.get(
  "/:id",
  verifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await examHandler.getById(req.params.id);
    return res.status(result.statusResponse.status).json(result);
  }
);

// Insert exam
router.post(
  `/`,
  verifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await examHandler.insert(req.body);
    return res.status(result.status).json(result);
  }
);

module.exports = router;
