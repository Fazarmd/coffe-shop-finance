import db from "../db/db.js";
import moment from "moment-timezone";
import { v4 } from "uuid";

class TransactionModels {
  //Post add
  async insert(item_id, quantity, total_price) {
    const newTransaction = {
      id: v4(),
      item_id,
      quantity,
      transaction_date: moment().tz("Asia/Jakarta").format(),
      total_price,
    };
    return await db.insert(newTransaction).into("transaction").returning("*"); //.returning
  }

  //get item
  async getItemById(item_id) {
    return await db.select("price").from("items").where("id", item_id).first();
  }

  async findAll(limit, offset) {
    const query = await db.select("transaction.*", "items.name as item_name").from("transaction").join("items", "transaction.item_id", "items.id").limit(limit).offset(offset);
    return query;
  }

  async count() {
    const count = await db("transaction").count("* as total");
    return count[0].total;
  }

  async findAllItem() {
    const query = await db.select("*").table("items");
    return query;
  }

  //Get getById
  async findById(id) {
    const resp = await db.select("*").table("transaction").where({ id });
    if (resp.length > 0) {
      return resp[0];
    }
    return null;
  }

  //Delete deleteById
  async delete(id) {
    return await db.del().table("transaction").where({ id });
  }

  //Update editById
  async edit(id, body) {
    return await db.update(body).table("transaction").where({ id }).returning("*");
  }
}

export default TransactionModels;
