import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import TransactionModels from "../../model/transaction.model.js";

const models = new TransactionModels();

async function addTransaction(req, res) {
  try {
    const body = req.body;

    if (!body.item_id) {
      return res.status(400).json(responseError("Title is required"));
    }
    if (!body.quantity) {
      return res.status(400).json(responseError("Ingredients are required"));
    }
    if (!body.transaction_date) {
      return res.status(400).json(responseError("Instruction is required"));
    }
    if (!body.total_price) {
      return res.status(400).json(responseError("caption is required"));
    }

    const data = await models.insert(body.item_id, body.quantity, body.transaction_date, body.total_price);
    return res.status(201).json(responseOk("Success insert data", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while inserting data", error.message));
  }
}

export { addTransaction };
