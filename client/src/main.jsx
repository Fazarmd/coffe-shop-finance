import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Revenue from "./pages/revenue-page/Revenue.jsx";
import Transaction from "./pages/transaction-page/Transaction.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
