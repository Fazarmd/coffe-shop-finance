import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
  const [items, setItems] = useState([]);
  const [transaction, setTransaction] = useState({ item_id: "", quantity: "" });
  const [transactions, setTransactions] = useState([]); // State baru untuk menyimpan data transaksi
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionsPerPage] = useState(10);

  useEffect(() => {
    // Ganti dengan URL API Anda
    axios
      .get("http://localhost:9000/api/v1/items")
      .then((res) => {
        console.log(res.data.data.item); // Cetak hasil ke konsol
        setItems(res.data.data.item);
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
      });
  }, []);

  const loadTransactions = () => {
    axios
      .get(`http://localhost:9000/api/v1/transaction?page=${currentPage}&itemsPerPage=${transactionsPerPage}&sort=transaction_date,desc`)
      .then((res) => {
        console.log(res.data.data.transaction);
        setTransactions(res.data.data.transaction); // Set transactions state with new data
        setTotalTransactions(res.data.data.total); // Update totalTransactions
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
      });
  };

  useEffect(() => {
    loadTransactions();
  }, [currentPage]); // Add currentPage as a dependency

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ganti dengan URL API Anda
    axios
      .post("http://localhost:9000/api/v1/transaction/add", transaction)
      .then((res) => {
        console.log(res.data);
        loadTransactions(); // Reload transactions after a new one is added
        setTransaction({ item_id: "", quantity: "" });
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
      });
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTransactions / transactionsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => {
    return (
      <li key={number} id={number} onClick={() => setCurrentPage(number)} className="inline-block px-3 py-1 m-1 border rounded cursor-pointer">
        {number}
      </li>
    );
  });

  return (
    <div className="container mx-auto px-4 bg-[#ffffff] p-6 rounded-lg shadow-md text-black">
      <nav className="flex items-center justify-between flex-wrap bg-[#0e0e0e] p-6 mb-6 rounded-lg shadow-sm">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Transaction</span>
        </div>
      </nav>
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow-sm flex justify-center">
        <select name="item_id" onChange={handleChange} className="border border-black p-2 rounded mr-2 bg-gray-200" value={transaction.item_id}>
          <option>Pilih Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - Rp{item.price}
            </option>
          ))}
        </select>
        <input type="number" name="quantity" onChange={handleChange} placeholder="Quantity" className="border border-black p-2 rounded mr-2 bg-gray-200" value={transaction.quantity} />
        <button type="submit" className="bg-black hover:bg-gray-800 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <div className="flex justify-center">
        <table className="table-auto bg-white p-4 rounded-lg shadow-sm w-full md:w-3/4 lg:w-1/2">
          <thead>
            <tr>
              <th className="w-1 px-4 py-2 text-black text-center">Name</th>
              <th className="w-1 px-4 py-2 text-black text-center">Quantity</th>
              <th className="w-1 px-4 py-2 text-black text-center">Price</th>
              <th className="w-1 px-4 py-2 text-black text-center">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions
              .slice()
              .sort((a, b) => new Date(b.transaction_date) - new Date(a.transaction_date))
              .map((trans) => (
                <tr key={trans.id}>
                  <td className="border w-1/4 px-4 py-2 text-center">{trans.item_name}</td>
                  <td className="border w-1/4 px-4 py-2 text-center">{trans.quantity}</td>
                  <td className="border w-1/4 px-4 py-2 text-center">{trans.total_price}</td>
                  <td className="border w-1/4 px-4 py-2 text-center">{new Date(trans.transaction_date).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <ul id="page-numbers" className="flex justify-center mt-4">
        {renderPageNumbers}
      </ul>
    </div>
  );
};

export default Transaction;
