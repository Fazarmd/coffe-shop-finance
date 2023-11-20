import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import AnalysisModels from "../../model/analysis.model.js";

const analysisModels = new AnalysisModels();

async function getSalesComparison(req, res) {
  try {
    const { period1, period2 } = req.params; // Atur parameter sesuai dengan kebutuhan Anda
    const salesComparisonData = await analysisModels.compare(period1, period2);

    const data = {
      salesComparison: salesComparisonData,
    };

    return res.status(200).json(responseOk("Sales comparison retrieved", data));
  } catch (error) {
    console.error("Error while fetching sales comparison:", error);
    return res.status(500).json(responseError("Error while fetching sales comparison", error.message));
  }
}

export { getSalesComparison };
