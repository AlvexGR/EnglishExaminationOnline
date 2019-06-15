import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

// Login
router.post("/", (req: Request, res: Response) => {
  return res.json({
    success: "Success!"
  });
});

module.exports = router;
