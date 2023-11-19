import db from "../db/db.js";
import moment from "moment-timezone";
import { v4 } from "uuid";

class ExpensesModels {
  //Post add
  async insert(expense_type, amount, expense_date, description) {
    const newExpenses = {
      id: v4(),
      expense_type,
      amount,
      expense_date,
      description,
    };
    return await db.insert(newExpenses).into("expenses").returning("*"); //.returning
  }

  //Get all

  async findAll(limit, offset, startDate, endDate, expenseType) {
    let query = db.select("*").table("expenses").orderBy("expense_date", "desc").limit(limit).offset(offset);
    if (startDate && endDate) {
      query = query.whereBetween("expense_date", [startDate, endDate]);
    }
    if (expenseType) {
      query = query.where("expense_type", expenseType);
    }
    return await query;
  }

  async count(startDate, endDate, expenseType) {
    let query = db("expenses").count("* as total");
    if (startDate && endDate) {
      query = query.whereBetween("expense_date", [startDate, endDate]);
    }
    if (expenseType) {
      query = query.where("expense_type", expenseType);
    }
    const count = await query;
    return count[0].total;
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
