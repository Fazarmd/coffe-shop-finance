import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Expense = () => {
  const [expenseType, setExpenseType] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [expensesPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterExpenseType, setFilterExpenseType] = useState("");

  const fetchData = async (url) => {
    try {
      const res = await axios.get(url);
      return res.data.data;
    } catch (err) {
      console.error(err);
      // alert("Terjadi kesalahan saat memuat data. Silakan coba lagi.");
    }
  };

  const loadExpenses = async () => {
    let url = `http://localhost:9000/api/v1/expenses?page=${currentPage}&itemsPerPage=${expensesPerPage}&sort=expense_date,desc`;
    let start = startDate;
    let end = endDate;

    if (start && end) {
      const endDateObject = new Date(end);
      endDateObject.setDate(endDateObject.getDate() + 1);
      const adjustedEnd = endDateObject.toISOString().split("T")[0];
      url += `&startDate=${start}&endDate=${adjustedEnd}`;
    }

    if (filterExpenseType) {
      url += `&expenseType=${filterExpenseType}`;
    }

    const data = await fetchData(url);
    setExpenses(data.expense);
    setTotalExpenses(data.total);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilterExpenseType(selectedFilter);
  };

  useEffect(() => {
    loadExpenses();
  }, [currentPage, startDate, endDate, filterExpenseType]);

  const handleExpenseTypeChange = (selectedExpenseType) => {
    setExpenseType(selectedExpenseType);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle logic to save expense data to the database
    try {
      await axios.post("http://localhost:9000/api/v1/expenses/add", { expense_type: expenseType, amount, expense_date: date, description });
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat mengirim data. Silakan coba lagi.");
    }
    console.log("Expense data submitted:", { expense_type: expenseType, amount, expense_date: date, description });
    // Reset form fields after submission
    setExpenseType("");
    setAmount("");
    setDate("");
    setDescription("");
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalExpenses / expensesPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li key={number} id={number} onClick={() => setCurrentPage(number)} className="inline-block px-3 py-1 m-1 border rounded cursor-pointer">
      {number}
    </li>
  ));

  return (
    <div className="container mx-auto px-4 bg-white p-6 rounded-lg shadow-md text-black">
      <nav className="flex items-center justify-between flex-wrap bg-black p-6 mb-6 rounded-lg shadow-sm">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-semibold text-xl tracking-tight">Expenses</span>
        </div>
      </nav>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="expenseType" className="block text-sm font-medium text-gray-700">
            Jenis Pengeluaran
          </label>
          <select id="expenseType" className="mt-1 border-black p-2 border w-full rounded mr-2 bg-gray-200" value={expenseType} onChange={(e) => handleExpenseTypeChange(e.target.value)} required>
            <option value="" disabled>
              Pilih Jenis Pengeluaran
            </option>
            <option value="Internet">Internet</option>
            <option value="Gaji">Gaji</option>
            <option value="Operasional">Operasional</option>
            <option value="Stock">Stock</option>
            <option value="Pengelola">Pengelola</option>
          </select>
        </div>
        {/* Jika jenis pengeluaran sudah ditetapkan, nonaktifkan input jumlah dan deskripsi */}
        {expenseType && (
          <>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium border-black text-gray-700">
                Jumlah
              </label>
              <input type="number" id="amount" className="mt-1 p-2 border border-black w-full rounded mr-2 bg-gray-200" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium border-black text-gray-700">
                Tanggal
              </label>
              <input type="date" id="date" className="mt-1 p-2 border border-black w-full rounded mr-2 bg-gray-200" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium border-black text-gray-700">
                Deskripsi
              </label>
              <textarea id="description" className="mt-1 p-2 border border-black w-full rounded mr-2 bg-gray-200" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </>
        )}
        <button type="submit" className="bg-black hover:bg-gray-800 text-white p-2 rounded mb-4">
          Simpan
        </button>
      </form>
      <div className="flex justify-center">
        <input type="date" onChange={(e) => setStartDate(e.target.value)} className="border border-black p-2 rounded mr-2 bg-gray-200" />
        <input type="date" onChange={(e) => setEndDate(e.target.value)} className="border border-black p-2 rounded mr-2 bg-gray-200" />
        <select id="filterExpenseType" className="mt-1 border-black p-2 border w-1/7 rounded mr-2 bg-gray-200" value={filterExpenseType} onChange={(e) => handleFilterChange(e.target.value)} required>
          <option value="">Semua Jenis Pengeluaran</option>
          <option value="Internet">Internet</option>
          <option value="Gaji">Gaji</option>
          <option value="Operasional">Operasional</option>
          <option value="Stock">Stock</option>
          <option value="Pengelola">Pengelola</option>
        </select>
      </div>

      <div className="flex justify-center">
        <table className="table-auto bg-white p-4 rounded-lg shadow-sm w-full md:w-3/4 lg:w-1/2">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2 text-black text-center">Expense Type</th>
              <th className="w-1/4 px-4 py-2 text-black text-center">Amount</th>
              <th className="w-1/4 px-4 py-2 text-black text-center">Date</th>
              <th className="w-1/4 px-4 py-2 text-black text-center">Details</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .slice()
              .sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date))
              .map((exp) => (
                <tr key={exp.id}>
                  <td className="border w-1/4 px-4 py-2 text-center">{exp.expense_type}</td>
                  <td className="border w-1/4 px-4 py-2 text-center">{exp.amount}</td>
                  <td className="border w-1/4 px-4 py-2 text-center">{new Date(exp.expense_date).toLocaleDateString("id-ID")}</td>
                  <td className="border w-1/4 px-4 py-2 text-center">
                    <Link to={`/expenses/${exp.id}`} className="text-blue-500 hover:underline">
                      Details
                    </Link>
                  </td>
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

export default Expense;
