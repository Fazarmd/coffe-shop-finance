import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import ExpensesModels from "../../model/expenses.model.js";

const models = new ExpensesModels();

async function deleteExpensesById(req, res) {
  try {
    const id = req.params["id"];
    if (!id) return res.status(401).json(responseError("ID is required"));

    const data = await models.delete(id);
    if (!data) return res.status(400).json(responseError("data is not found"));

    return res.status(200).json(responseOk(`Success delete ${id}`, data));
  } catch (error) {
    return res.status(500).json(responseError("something went wrong", error.message));
  }
}

export { deleteExpensesById };
