import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import ExpensesModels from "../../model/expenses.model.js";

const models = new ExpensesModels();

async function getExpensesById(req, res) {
  try {
    const id = req.params["id"];
    const data = await models.findById(id);

    if (!data || data.length === 0) {
      return res.status(404).json(responseError("Link can not be found!"));
    }

    return res.status(200).json(responseOk("Success get link by id", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching expense by id", error.message));
  }
}

export { getExpensesById };
