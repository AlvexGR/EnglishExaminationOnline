import express, { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../middleware/authentication.middleware";
import { HistoryHandler } from "../handlers/history.handler";
import { HttpHelper } from "@lib/helpers/http.helper";

const router = express.Router();
const historyHandler = new HistoryHandler();

// Add history
router.post(
  `/`,
  verifyAccessToken,
  async (req: Request, res: Response, next: NextFunction) => {
    const history = historyHandler.createFromObj(req.body);
    const result = await historyHandler.insert(history);
    return res.status(result.status).json({ statusResponse: result });
  }
);

// Get by UserId
router.get(
  `/${HttpHelper.users}/:id`,
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await historyHandler.getByUserId(req.params.id);
    return res.status(result.statusResponse.status).json(result);
  }
);

// Get by id
router.get(`/:id`, async (req: Request, res: Response, next: NextFunction) => {
  const result = await historyHandler.getById(req.params.id);
  return res.status(result.statusResponse.status).json(result);
});

module.exports = router;
