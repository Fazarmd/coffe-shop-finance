import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import AnalysisModels from "../../model/analysis.model.js";

const analysisModels = new AnalysisModels();

async function getSalesTrend(req, res) {
  try {
    const trendType = req.params.period; // "daily", "weekly", or "monthly"
    let salesTrendData;

    switch (trendType) {
      case "daily":
        // Tampilkan data penjualan 7 hari terakhir
        salesTrendData = await analysisModels.dailySales();
        break;
      case "weekly":
        // Tampilkan data penjualan 4 minggu terakhir
        salesTrendData = await analysisModels.weeklySales();
        break;
      case "monthly":
        // Tampilkan data penjualan 12 bulan terakhir
        salesTrendData = await analysisModels.monthlySales();
        break;
      default:
        return res.status(400).json(responseError("Invalid trendType parameter"));
    }

    const data = {
      salesTrend: salesTrendData,
    };

    return res.status(200).json(responseOk("Sales trend retrieved", data));
  } catch (error) {
    console.error("Error while fetching sales trend:", error);
    return res.status(500).json(responseError("Error while fetching sales trend", error.message));
  }
}

export { getSalesTrend };
