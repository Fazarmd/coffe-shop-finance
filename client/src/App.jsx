import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Transaction from "./pages/transaction-page/Transaction";
import Expense from "./pages/expense-page/Expense";
import ExpenseDetail from "./pages/expense-page/ExpenseDetail";
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
          <Route path="/expenses" element={<Expense />} />
          <Route path="/expenses/:id" element={<ExpenseDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
