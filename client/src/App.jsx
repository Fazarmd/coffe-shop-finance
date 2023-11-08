import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Transaction from "./pages/transaction-page/Transaction";
// Import other pages here

const App = () => {
  return (
    <div className="flex">
      <div className="w-full sm:w-72">
        <Sidebar />
      </div>
      <div className="w-full">
        <Routes>
          <Route path="/transactions" element={<Transaction />} />
          {/* Add other routes here */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
