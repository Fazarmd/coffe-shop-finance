import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import TransactionModels from "../../model/transaction.model.js";

const models = new TransactionModels();

async function getTransactionById(req, res) {
  try {
    const id = req.params["id"];
    const data = await models.findById(id);

    if (!data || data.length === 0) {
      return res.status(404).json(responseError("Data can not be found!"));
    }

    return res.status(200).json(responseOk("Success get Data by id", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching transaction by id", error.message));
  }
}

export { getTransactionById };
