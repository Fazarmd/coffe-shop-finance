import express from "express";
import restResponseHelper, { responseOk } from "../helper/restResponse.helper.js";
const reportsRouter = express.Router();
const prefixPath = "api/v1/reports";

reportsRouter.get("/api/v1/reports", (req, res) => {
  res.status(200).json(responseOk("berhasil tersambung", prefixPath));
});

export default reportsRouter;
