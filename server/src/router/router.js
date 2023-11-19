import express from "express";
import reportsRouter from "./reports.router.js";
import transactionRouter from "./transaction.router.js";
import expensesRouter from "./expenses.route.js";
import analysisRouter from "./analysis.route.js";
import userRouter from "./user.router.js";

const router = express.Router();

router.use(reportsRouter);
router.use(transactionRouter);
router.use(expensesRouter);
router.use(analysisRouter);
router.use(userRouter);

export default router;
