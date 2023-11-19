import express from "express";
import { getSalesTrend } from "../controller/analysis/getSalesTrend.controller.js";

const analysisRouter = express.Router();
const prefixPath = "api/v1/analysis";

analysisRouter.get(`/${prefixPath}/sales-trend/:period`, getSalesTrend);
// analysisRouter.get(`/${prefixPath}/best-selling-products`, getBestSellingProducts);
// analysisRouter.get(`/${prefixPath}/cost-analysis`, getCostAnalysis);
// analysisRouter.get(`/${prefixPath}/sales-comparison/:period1/:period2`, getSalesComparison);

export default analysisRouter;
