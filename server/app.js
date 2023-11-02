import express from "express";

const app = express();
const PORT = process.env.PORT || 8000;

app.get("/ping", (req, res) => {
  res.status(200).json({
    PING: "PONG",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
