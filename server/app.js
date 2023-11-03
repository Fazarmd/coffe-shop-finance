import express from "express";
import router from "./src/router/router.js";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
const PORT = process.env.PORT || 8000;

// app.get("/ping", (req, res) => {
//   res.status(200).json({
//     PING: "PONG",
//   });
// });

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
