import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import ExpensesModels from "../../model/expenses.model.js";

const models = new ExpensesModels();

async function getExpenses(_, res) {
  try {
    const expense = await models.findAll();
    const data = {
      expense,
      total: expense.length,
    };

    return res.status(200).json(responseOk("Success get all link", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching Expenses", error.message));
  }
}

export { getExpenses };
