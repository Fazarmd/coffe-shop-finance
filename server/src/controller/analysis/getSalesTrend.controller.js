import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import AnalysisModels from "../../model/analysis.model.js";

const analysisModels = new AnalysisModels();

async function getSalesTrend(req, res) {
  try {
    const trendType = req.params.period;
    let salesTrendData;

    switch (trendType) {
      case "daily":
        salesTrendData = await analysisModels.dailySales();
        break;
      case "weekly":
        salesTrendData = await analysisModels.weeklySales();
        break;
      case "monthly":
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
