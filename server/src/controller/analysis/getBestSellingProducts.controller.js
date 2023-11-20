import { responseOk, responseError } from "../../helper/restResponse.helper.js";
import AnalysisModels from "../../model/analysis.model.js";

const analysisModels = new AnalysisModels();

async function getBestSellingProducts(req, res) {
  try {
    const bestSellingProducts = await analysisModels.topSale();

    const data = {
      bestSellingProducts,
    };

    return res.status(200).json(responseOk("Best selling products retrieved", data));
  } catch (error) {
    console.error("Error while fetching best selling products:", error);
    return res.status(500).json(responseError("Error while fetching best selling products", error.message));
  }
}

export { getBestSellingProducts };
