import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import TransactionModels from "../../model/transaction.model.js";

const models = new TransactionModels();

async function addTransaction(req, res) {
  const { item_id, quantity } = req.body;
  try {
    // Validasi data yang diterima
    if (!item_id || !quantity) {
      return res.status(400).json(responseError("Item ID and Quantity are required"));
    }

    // Ambil harga item dari tabel items
    const item = await models.getItemById(item_id);

    // Hitung total harga
    const total_price = item.price * quantity;

    // Simpan data transaksi
    const data = await models.insert(item_id, quantity, total_price);

    // Kirim respon
    return res.status(201).json(responseOk("Success insert data", data));
  } catch (error) {
    return res.status(500).json(responseError("Error while inserting data", error.message));
  }
}

export { addTransaction };
