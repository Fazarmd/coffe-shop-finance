// import React, { useState } from "react";

// const Transaction = () => {
//   const [transactions, setTransactions] = useState([]);
//   const [item, setItem] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setTransactions([...transactions, item]);
//     setItem("");
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl mb-4">Transaction Page</h1>
//       <form onSubmit={handleSubmit} className="mb-4">
//         <input type="text" value={item} onChange={(e) => setItem(e.target.value)} className="border p-2 mr-2" placeholder="Enter item" />
//         <button type="submit" className="bg-blue-500 text-white p-2">
//           Add Item
//         </button>
//       </form>
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr>
//             <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Items</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((transaction, index) => (
//             <tr key={index} className="hover:bg-grey-lighter">
//               <td className="py-4 px-6 border-b border-grey-light">{transaction}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Transaction;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Transaction = () => {
  const [items, setItems] = useState([]);
  const [transaction, setTransaction] = useState({ item_id: "", quantity: "" });
  const [transactions, setTransactions] = useState([]); // State baru untuk menyimpan data transaksi

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
    // Ganti dengan URL API Anda
    axios
      .get("http://localhost:9000/api/v1/transaction")
      .then((res) => {
        console.log(res.data.data.transaction); // Cetak hasil ke konsol
        setTransactions(res.data.data.transaction); // Perbarui state transactions dengan data dari API
      })
      .catch((err) => {
        console.error(err);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
      });
  }, [transaction]); // Dependensi useEffect ini adalah state transaction, jadi fungsi ini akan dijalankan setiap kali state transaction berubah

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
      {/* Tampilkan data transaksi di sini dalam bentuk tabel */}
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
              <td className="border px-4 py-2">{trans.transaction_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
