import express, { Request, Response, NextFunction } from "express";
import { ExamVoteHandler } from "../handlers/exam-vote.handler";

const router = express.Router();
const examVoteHandler = new ExamVoteHandler();

// Get all
router.get(`/`, async (req: Request, res: Response, next: NextFunction) => {
  const result = await examVoteHandler.getAll();
  return res.status(result.statusResponse.status).json(result);
});

// Get by id
router.get(`/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const result = await examVoteHandler.getById(req.params.id);
  return res.status(result.statusResponse.status).json(result);
});

// Insert
router.post(`/`, async (req: Request, res: Response, next: NextFunction) => {
  const result = await examVoteHandler.insert(req.body);
  return res.status(result.status).json(result);
});

// Update
router.put(`/`, async (req: Request, res: Response, next: NextFunction) => {
  const result = await examVoteHandler.update(req.body);
  return res.status(result.status).json(result);
});

// Delete
router.delete(
  `/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await examVoteHandler.delete(req.params.id);
    return res.status(result.status).json(result);
  }
);

module.exports = router;
