import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import ExpensesModels from "../../model/expenses.model.js";

const models = new ExpensesModels();

async function addExpenses(req, res) {
  const { expense_type, amount, expense_date, description } = req.body;
  try {
    if (!expense_type) {
      return res.status(400).json(responseError("expense type is required"));
    }
    if (!amount) {
      return res.status(400).json(responseError("amount are required"));
    }
    if (!expense_date) {
      return res.status(400).json(responseError("expense date are required"));
    }
    if (!description) {
      return res.status(400).json(responseError("description is required"));
    }

    const data = await models.insert(expense_type, amount, expense_date, description);
    return res.status(201).json(responseOk("Success add new expenses", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while adding expenses", error.message));
  }
}

export { addExpenses };
