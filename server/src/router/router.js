import express from "express";
import reportsRouter from "./reports.router.js";
import transactionRouter from "./transaction.router.js";
import userRouter from "./user.router.js";

const router = express.Router();

router.use(reportsRouter);
router.use(transactionRouter);
router.use(userRouter);

export default router;
