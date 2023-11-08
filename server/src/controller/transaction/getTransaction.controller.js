import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import TransactionModels from "../../model/transaction.model.js";

const models = new TransactionModels();

async function getTransaction(req, res) {
  try {
    const page = req.query.page || 1;
    const itemsPerPage = req.query.itemsPerPage || 10;
    const offset = (page - 1) * itemsPerPage;

    const transaction = await models.findAll(itemsPerPage, offset);

    const total = await models.count(); // Panggil fungsi count()

    const data = {
      transaction,
      total,
    };

    return res.status(200).json(responseOk("Success get all transaction", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while fetching transaction", error.message));
  }
}

export { getTransaction };
