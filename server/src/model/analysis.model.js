import db from "../db/db.js";

class AnalysisModels {
  async dailySales() {
    return await db("transaction").select(db.raw("DATE(transaction_date) as date")).sum("total_price as sales").groupBy(db.raw("DATE(transaction_date)"));
  }

  async weeklySales() {
    return await db("transaction").select(db.raw("EXTRACT(WEEK FROM transaction_date) as week")).sum("total_price as sales").groupBy(db.raw("EXTRACT(WEEK FROM transaction_date)"));
  }

  async monthlySales() {
    return await db("transaction").select(db.raw("EXTRACT(MONTH FROM transaction_date) as month")).sum("total_price as sales").groupBy(db.raw("EXTRACT(MONTH FROM transaction_date)"));
  }
}

export default AnalysisModels;
