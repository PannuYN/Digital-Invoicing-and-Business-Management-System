// src/PieChart.js

import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const [invoicesCreatedBy, setInvoicesCreatedBy] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/readInvoiceCreators", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        });

        const data = await response.json();
        setInvoicesCreatedBy(data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: invoicesCreatedBy.map(invoice => invoice.created_by),
    datasets: [
      {
        label: 'Invoices Created By',
        data: invoicesCreatedBy.map(invoice => invoice.total_invoices),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <div>
      <h2>Invoices Created By</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
