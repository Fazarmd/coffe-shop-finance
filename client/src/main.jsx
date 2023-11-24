import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App.jsx";
// import SalesTrend from "./components/analysis/SalesTrend.jsx";
import Transaction from "./pages/transaction-page/Transaction.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Transaction />
    </BrowserRouter>
  </React.StrictMode>
);
