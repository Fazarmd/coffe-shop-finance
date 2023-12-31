import express from "express";
import { getTransaction, getTransactionById, addTransaction, editTransactionById, deleteTransactionById, getItem } from "../controller/transaction/transaction.controllers.js";
const transactionRouter = express.Router();
const prefixPath = "api/v1/transaction";

transactionRouter.get(`/api/v1/items`, getItem);
transactionRouter.get(`/${prefixPath}`, getTransaction);
transactionRouter.get(`/${prefixPath}/:id`, getTransactionById);
transactionRouter.post(`/${prefixPath}/add`, addTransaction);
transactionRouter.put(`/${prefixPath}/edit/:id`, editTransactionById);
transactionRouter.delete(`/${prefixPath}/delete/:id`, deleteTransactionById);

export default transactionRouter;
