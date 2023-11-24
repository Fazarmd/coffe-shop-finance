import db from "../db/db.js";
import moment from "moment";

class AnalysisModels {
  async dailySales() {
    return await db("transaction")
      .select(db.raw("DATE(transaction_date) as date"))
      .sum("total_price as sales")
      .whereBetween("transaction_date", [moment().subtract(8, "days").format(), moment().format()])
      .groupBy(db.raw("DATE(transaction_date)"))
      .orderBy("date", "asc"); // Urutkan secara ascending berdasarkan tanggal
  }

  async weeklySales() {
    return await db("transaction")
      .select(db.raw("EXTRACT(WEEK FROM transaction_date) as week"))
      .sum("total_price as sales")
      .whereBetween("transaction_date", [moment().subtract(4, "weeks").format(), moment().format()])
      .groupByRaw("EXTRACT(WEEK FROM transaction_date)")
      .orderBy("week", "asc"); // Urutkan secara ascending berdasarkan minggu
  }

  async monthlySales() {
    return await db("transaction")
      .select(db.raw("EXTRACT(MONTH FROM transaction_date) as month"))
      .sum("total_price as sales")
      .whereBetween("transaction_date", [moment().subtract(12, "months").format(), moment().format()])
      .groupByRaw("EXTRACT(MONTH FROM transaction_date)")
      .orderBy("month", "asc"); // Urutkan secara ascending berdasarkan bulan
  }

  async topSale() {
    return await db("transaction")
      .select("items.name as product_name")
      .sum("transaction.quantity as total_quantity_sold")
      .join("items", "transaction.item_id", "items.id")
      .groupBy("items.name")
      .orderBy("total_quantity_sold", "desc")
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
