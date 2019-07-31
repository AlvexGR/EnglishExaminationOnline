import express from "express";
import { verifyAccessToken } from "../middleware/authentication.middleware";
import { getAllExamVote, insertOrUpdateExamVote } from "../middleware/exam-vote.middleware";

const router = express.Router();

// Get all
router.get(`/:userId&:examId`, verifyAccessToken, getAllExamVote);

router.post(`/`, verifyAccessToken, insertOrUpdateExamVote);

module.exports = router;
