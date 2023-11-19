import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import ExpensesModels from "../../model/expenses.model.js";

const models = new ExpensesModels();

async function getExpenses(req, res) {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 10;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const expenseType = req.query.expenseType; // Tambahkan ini
    const offset = (page - 1) * itemsPerPage;

    const expense = await models.findAll(itemsPerPage, offset, startDate, endDate, expenseType);
    const total = await models.count(startDate, endDate, expenseType);

    const data = {
      expense,
      total,
    };

    return res.status(200).json(responseOk("Success get all link", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching Expenses", error.message));
  }
}

export { getExpenses };
