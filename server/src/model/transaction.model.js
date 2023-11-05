import db from "../db/db.js";
import { v4 } from "uuid";

class TransactionModels {
  //Post add
  async insert(item_id, quantity, total_price) {
    const newTransaction = {
      id: v4(),
      item_id,
      quantity,
      transaction_date: new Date(),
      total_price,
    };
    return await db.insert(newTransaction).into("transaction").returning("*"); //.returning
  }

  //get item
  async getItemById(item_id) {
    return await db.select("price").from("items").where("id", item_id).first();
  }

  //Get all
  async findAll() {
    const query = await db.select("*").table("transaction");
    return query;
    // return this.recipesData;
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
