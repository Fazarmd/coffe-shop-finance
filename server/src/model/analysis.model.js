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

  async topSale() {
    return await db("transaction")
      .select("items.id", "items.name", db.raw("SUM(transaction.total_price) as total_sales"))
      .join("items", "transaction.item_id", "items.id")
      .groupBy("items.id", "items.name")
      .orderBy("total_sales", "desc")
      .limit(5); // Ambil lima produk terlaris
  }

  async cost() {
    return await db("expenses").select("expense_type as category", db.raw("SUM(amount) as total_cost")).groupBy("expense_type").orderBy("total_cost", "desc");
  }

  async compare(period1, period2) {
    return await db("transaction")
      .select(
        "item_id",
        "items.name as item_name",
        db.raw(`SUM(CASE WHEN DATE(transaction_date) = '${period1}' THEN total_price ELSE 0 END) as sales_period1`),
        db.raw(`SUM(CASE WHEN DATE(transaction_date) = '${period2}' THEN total_price ELSE 0 END) as sales_period2`)
      )
      .join("items", "transaction.item_id", "items.id")
      .groupBy("item_id", "items.name");
  }
}

export default AnalysisModels;
