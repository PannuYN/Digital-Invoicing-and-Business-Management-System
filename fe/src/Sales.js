import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import Navigation from './Navigation';
import "./css/Main.css";
import "./css/Sales.css";

function Sales() {

  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);

  // Fetch products from the backend API
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    let result = await fetch("http://localhost:8000/api/readAllProducts", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    result = await result.json();
    setProducts(result);
  }

  useEffect(() => {
    fetchClients();
  }, []);
  const fetchClients = async () => {
    let result = await fetch("http://localhost:8000/api/readAllClients", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    result = await result.json();
    setClients(result);
  }
  console.log(clients);

  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    let result = await fetch("http://localhost:8000/api/readAllOrders", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    result = await result.json();
    setOrders(result);
  }

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    let result = await fetch("http://localhost:8000/api/readAllInvoices", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    result = await result.json();
    setInvoices(result);
  }

  const [overall, setOverAll] = useState([]);
  useEffect(() => {
    fetchOverall();
  }, []);
  async function fetchOverall() {
    let result = await fetch("http://localhost:8000/api/overallSales", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });
    result = await result.json();
    setOverAll(result);
  }

  const chartRef = useRef(null);
  useEffect(() => {
    const chartInstance = chartRef.current; // Get the chart instance

    // Ensure the chart instance exists before attempting to destroy it
    if (chartInstance) {
      // Destroy the chart instance when the component is unmounted
      return () => {
        chartInstance.destroy();
      };
    }
  }, []);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: overall,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };


  //top clients and products
  const [topCustomers, setTopCustomers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        let customersResponse = await fetch("http://localhost:8000/api/readAllTopClients", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        });
        let productsResponse = await fetch("http://localhost:8000/api/readAllTopProducts", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        });
        customersResponse = await customersResponse.json();
        productsResponse = await productsResponse.json();
        setTopCustomers(customersResponse);
        setTopProducts(productsResponse);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);
  //console.log(topCustomers);

  const customersData = {
    labels: topCustomers.map(customer => customer.name),
    datasets: [
      {
        label: 'Top Customers',
        data: topCustomers.map(customer => customer.total_amount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const productsData = {
    labels: topProducts.map(product => product.name),
    datasets: [
      {
        label: 'Top Products',
        data: topProducts.map(product => product.total_quantity),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };



  //Pie chart
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
      <Navigation />
      <h3 style={{ marginTop: '20px' }}>Sales and Analytics</h3>      
      <div className="charts-container">
      <div className="grid-container">
        <div className="grid-item">
          <div className="chart-wrapper bar-chart-wrapper">
            <Bar ref={chartRef} data={data} options={options} />
          </div>
          <h2 className="chart-title">Overall Monthly Sales</h2>
        </div>
        <div className="grid-item">
          <div className="chart-wrapper pie-chart-wrapper">
            <Pie data={chartData} />
          </div>
          <h2 className="chart-title">Performance of Invoice Managers</h2>
        </div>
        <div className="grid-item">
          <div className="chart-wrapper bar-chart-wrapper">
            <Bar data={customersData} />
          </div>
          <h2 className="chart-title">Top 5 Customers</h2>
        </div>
        <div className="grid-item">
          <div className="chart-wrapper bar-chart-wrapper">
            <Bar data={productsData} />
          </div>
          <h2 className="chart-title">Top 5 Products</h2>
        </div>
      </div>
    </div>
        
    </div>
    

  )
}

export default Sales