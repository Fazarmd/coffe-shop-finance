import React, { useState } from "react";

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [item, setItem] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTransactions([...transactions, item]);
    setItem("");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Transaction Page</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="text" value={item} onChange={(e) => setItem(e.target.value)} className="border p-2 mr-2" placeholder="Enter item" />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Add Item
        </button>
      </form>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Items</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="hover:bg-grey-lighter">
              <td className="py-4 px-6 border-b border-grey-light">{transaction}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
