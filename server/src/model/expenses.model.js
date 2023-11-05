import db from "../db/db.js";
import { v4 } from "uuid";

class ExpensesModels {
  //Post add
  async insert(expense_type, amount, description) {
    const newExpenses = {
      id: v4(),
      expense_type,
      amount,
      expense_date: new Date(),
      description,
    };
    return await db.insert(newExpenses).into("expenses").returning("*"); //.returning
  }

  //Get all
  async findAll() {
    const query = await db.select("*").table("expenses");
    return query;
    // return this.recipesData;
  }

  //Get getById
  async findById(id) {
    const resp = await db.select("*").table("expenses").where({ id });
    if (resp.length > 0) {
      return resp[0];
    }
    return null;
  }

  //Delete deleteById
  async delete(id) {
    return await db.del().table("expenses").where({ id });
  }

  //Update editById
  async edit(id, body) {
    return await db.update(body).table("expenses").where({ id }).returning("*");
  }
}

export default ExpensesModels;
