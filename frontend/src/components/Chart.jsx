import React, { useState } from "react";
import { useSelector } from "react-redux";
import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";




const ChartComponent = () => {
  const { monthData } = useSelector((state) => state.expense);

  const transformedData = monthData.map((item) => ({
    label: item.month,
    income: item.income,
    expense: item.expense,
  }));

  const [chartType, setChartType] = useState("Line");

  const ChartData = {
    labels: transformedData.map((item) => item.label), // Labels for X-axis
    datasets: [
      {
        data: transformedData.map((item) => item.income), // Income data
        label: "Income",
        borderColor: "#3333ff",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: transformedData.map((item) => item.expense), // Expense data
        label: "Expense",
        borderColor: "#ff3333",
        backgroundColor: "rgba(255, 0, 0, 0.5)",
        fill: true,
        lineTension: 0.5,
      },
    ],
  };

  const options = {
  
    plugins: {
      title: {
        display: true,
        text: "Expense Tracker",
        fontSize: 20,
        padding: 20,
        maintainAspectRatio: true,
      },
      legend: {
        display: true, // Is the legend shown?
        position: "top", // Position of the legend.
      },
    },
  };

  const chartComponent =
    chartType === "Line" ? (
      <Line options={options} data={ChartData} width={"100%"} height={"50%"} />
    ) : (
      <Bar options={options} data={ChartData} width={"100%"} height={"50%"} />
    );

  const handleChange = () => {
    if (chartType === "Line") setChartType("Bar");
    else setChartType("Line");
  };

  return (
    <div
      className="d-flex align-items-center flex-column flex-lg-row h-100 flex-row"
      style={{ minWidth: "80%" }}
    >
      {chartComponent}
      <button onClick={handleChange} className="btn btn-warning">Change {chartType} Chart</button>
    </div>
  );
};

export default ChartComponent;
