import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import TransactionModels from "../../model/transaction.model.js";

const models = new TransactionModels();

async function getItem(_, res) {
  try {
    const item = await models.findAllItem();
    const data = {
      item,
      total: item.length,
    };

    return res.status(200).json(responseOk("Success get all item", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching transaction", error.message));
  }
}

export { getItem };
