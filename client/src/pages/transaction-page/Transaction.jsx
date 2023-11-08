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

  useEffect(() => {
    axios
      .get(`http://localhost:9000/api/v1/transaction?page=${currentPage}&itemsPerPage=${transactionsPerPage}`)
      .then((res) => {
        console.log(res.data.data.transaction);
        setTransactions(res.data.data.transaction); // Set transactions state with new data
        setTotalTransactions(res.data.data.total); // Update totalTransactions
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
      });
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
        setTransactions([...transactions, res.data]); // Tambahkan data transaksi baru ke state transactions
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
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <select name="item_id" onChange={handleChange} className="border p-2 rounded mr-2">
          <option>Pilih Item</option>
          {items.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} - Rp{item.price}
            </option>
          ))}
        </select>
        <input type="number" name="quantity" onChange={handleChange} placeholder="Quantity" className="border p-2 rounded mr-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((trans) => (
            <tr key={trans.id}>
              <td className="border px-4 py-2">{trans.item_name}</td>
              <td className="border px-4 py-2">{trans.quantity}</td>
              <td className="border px-4 py-2">{trans.total_price}</td>
              <td className="border px-4 py-2">{new Date(trans.transaction_date).toLocaleDateString().split("-").reverse().join("/")}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul id="page-numbers" className="flex justify-center mt-4">
        {renderPageNumbers}
      </ul>
    </div>
  );
};

export default Transaction;
