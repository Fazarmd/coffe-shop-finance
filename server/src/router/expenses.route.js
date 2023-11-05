import express from "express";
import { getExpenses, getExpensesById, addExpenses, editExpensesById, deleteExpensesById } from "../controller/expenses/expenses.controllers.js";
const expensesRouter = express.Router();
const prefixPath = "api/v1/expenses";

expensesRouter.get(`/${prefixPath}`, getExpenses);
expensesRouter.get(`/${prefixPath}/:id`, getExpensesById);
expensesRouter.post(`/${prefixPath}/add`, addExpenses);
expensesRouter.put(`/${prefixPath}/edit/:id`, editExpensesById);
expensesRouter.delete(`/${prefixPath}/delete/:id`, deleteExpensesById);

export default expensesRouter;
