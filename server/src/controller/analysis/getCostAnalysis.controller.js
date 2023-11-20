import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import AnalysisModels from "../../model/analysis.model.js";

const analysisModels = new AnalysisModels();

async function getCostAnalysis(req, res) {
  try {
    const costAnalysis = await analysisModels.cost();

    const data = {
      costAnalysis,
    };

    return res.status(200).json(responseOk("Cost analysis retrieved", data));
  } catch (error) {
    console.error("Error while fetching cost analysis:", error);
    return res.status(500).json(responseError("Error while fetching cost analysis", error.message));
  }
}

export { getCostAnalysis };
