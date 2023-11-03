import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import TransactionModels from "../../model/transaction.model.js";

const models = new TransactionModels();

async function getTransaction(_, res) {
  try {
    const transaction = await models.findAll();
    const data = {
      transaction,
      total: transaction.length,
    };

    return res.status(200).json(responseOk("Success get all transaction", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching transaction", error.message));
  }
}

export { getTransaction };
