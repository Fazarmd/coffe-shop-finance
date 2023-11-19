import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ExpenseDetail = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/v1/expenses/${id}`);
        setExpense(res.data.data);
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
      }
    };

    fetchExpense();
  }, [id]);

  const handleEdit = () => {
    setEditedExpense(expense);
    setIsEditing(true);
  };

  const handleEditChange = (event) => {
    setEditedExpense({
      ...editedExpense,
      [event.target.name]: event.target.value,
    });
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:9000/api/v1/expenses/edit/${id}`, editedExpense);
      alert("Pengeluaran berhasil diperbarui.");
      setIsEditing(false);
      // Refresh the expense data
      const res = await axios.get(`http://localhost:9000/api/v1/expenses/${id}`);
      setExpense(res.data.data);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memperbarui data. Silakan coba lagi.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9000/api/v1/expenses/delete/${id}`);
      alert("Pengeluaran berhasil dihapus.");
      navigate("/expenses");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus data. Silakan coba lagi.");
    }
  };

  if (!expense) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 bg-white p-6 rounded-lg shadow-md text-black">
      <nav className="flex items-center justify-between flex-wrap bg-black p-6 mb-6 rounded-lg shadow-sm">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Expenses</span>
        </div>
      </nav>
      <h1 className="text-5xl font-bold mb-4 text-center text-black">Detail Pengeluaran</h1>
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4 w-full max-w-md mx-auto">
          <div>
            <label className="block text-lg font-medium text-gray-700">Jenis Pengeluaran:</label>
            {isEditing ? (
              <select
                name="expense_type"
                value={editedExpense.expense_type}
                onChange={handleEditChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
              >
                <option value="Internet">Internet</option>
                <option value="Gaji">Gaji</option>
                <option value="Operasional">Operasional</option>
                <option value="Stock">Stock</option>
                <option value="Pengelola">Pengelola</option>
              </select>
            ) : (
              <span className="text-gray-900">{expense.expense_type}</span>
            )}
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Jumlah:</label>
            <input
              type="number"
              name="amount"
              value={editedExpense.amount}
              onChange={handleEditChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Tanggal:</label>
            <input
              type="date"
              name="expense_date"
              value={editedExpense.expense_date}
              onChange={handleEditChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Deskripsi:</label>
            <textarea
              name="description"
              value={editedExpense.description}
              onChange={handleEditChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-lg"
            />
          </div>
          <button type="submit" className="bg-black hover:bg-gray-800 text-white p-2 rounded mb-4">
            Simpan
          </button>
        </form>
      ) : (
        <div className="space-y-2 w-full max-w-md mx-auto">
          <p>
            <span className="font-semibold text-lg text-gray-700">Jenis Pengeluaran:</span> <span className="text-gray-900">{expense.expense_type}</span>
          </p>
          <p>
            <span className="font-semibold text-lg text-gray-700">Jumlah:</span> <span className="text-gray-900">{expense.amount}</span>
          </p>
          <p>
            <span className="font-semibold text-lg text-gray-700">Tanggal:</span> <span className="text-gray-900">{new Date(expense.expense_date).toLocaleDateString("id-ID")}</span>
          </p>
          <p>
            <span className="font-semibold text-lg text-gray-700">Deskripsi:</span> <span className="text-gray-900">{expense.description}</span>
          </p>
          <div className="space-x-2">
            <button onClick={handleEdit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Edit
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;
