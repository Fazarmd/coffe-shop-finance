import db from "../db/db.js";

class ReportModels {
  // Fungsi untuk mengambil ringkasan pendapatan harian berdasarkan tanggal
  async getDailySummary(date) {
    const query = await db("transactions").select("date").where("date", date).sum("total_price as total_sales").groupBy("date");

    return query[0];
  }
}

export default ReportModels;
