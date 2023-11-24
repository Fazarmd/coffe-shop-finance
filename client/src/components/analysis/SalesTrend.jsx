import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Bar } from "recharts";

const AnalysisPage = () => {
  const [salesTrend, setSalesTrend] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [costAnalysis, setCostAnalysis] = useState([]);
  const [salesComparison, setSalesComparison] = useState([]);
  const [period, setPeriod] = useState("monthly");

  useEffect(() => {
    const fetchData = async () => {
      const salesTrendRes = await axios.get(`http://localhost:9000/api/v1/analysis/sales-trend/${period}`);
      setSalesTrend(salesTrendRes.data.data.salesTrend);

      const bestSellingProductsRes = await axios.get("http://localhost:9000/api/v1/analysis/best-selling-products");
      setBestSellingProducts(bestSellingProductsRes.data.data.bestSellingProducts);

      const costAnalysisRes = await axios.get("http://localhost:9000/api/v1/analysis/cost-analysis");
      setCostAnalysis(costAnalysisRes.data.data.costAnalysis);

      //   const salesComparisonRes = await axios.get("http://localhost:9000/api/v1/analysis/sales-comparison/this-month/last-month");
      //   setSalesComparison(salesComparisonRes.data.data);
    };

    fetchData();
  }, [period]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Analisis</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Trend Penjualan</h2>
          <select onChange={handlePeriodChange}>
            <option value="daily">Harian</option>
            <option value="weekly">Mingguan</option>
            <option value="monthly">Bulanan</option>
          </select>
          <LineChart width={500} height={300} data={salesTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Produk Terlaris</h2>
          <ul>
            {bestSellingProducts.map((product) => (
              <li key={product.id}>
                {product.product_name}: {product.total_quantity_sold}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Analisis Biaya</h2>
          <ul>
            {costAnalysis.map((cost) => (
              <li key={cost.category}>
                {cost.category}: {cost.total_cost}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 border rounded shadow">
          <h2 className="text-xl font-bold mb-2">Perbandingan Penjualan</h2>
          <LineChart width={500} height={300} data={salesComparison}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
