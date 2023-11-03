import express from "express";
import restResponseHelper, { responseOk } from "../helper/restResponse.helper.js";
const userRouter = express.Router();
const prefixPath = "api/v1/user";

userRouter.get("/api/v1/user", (req, res) => {
  res.status(200).json(responseOk("berhasil tersambung", prefixPath));
});

export default userRouter;
