import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import ExpensesModels from "../../model/expenses.model.js";

const models = new ExpensesModels();

async function editExpensesById(req, res) {
  try {
    const id = req.params["id"];
    const body = req.body;
    if (!id) return res.status(400).json(responseError("ID is required"));
    if (!body.expense_type && !body.amount && !body.description) {
      return res.status(400).json(responseError("At least one field is required to update"));
    }

    const data = await models.edit(id, body);
    if (!data) return res.status(404).json(responseError("expenses not found"));

    return res.status(200).json(responseOk(`Success update ${id}`, data));
  } catch (error) {
    return res.status(500).json(responseError("Error while updating expenses", error.message));
  }
}

export { editExpensesById };
