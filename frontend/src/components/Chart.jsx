import React, { useState } from "react";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import moment from "moment";

const ChartComponent = () => {
  const { allTransactions, dates } = useSelector((state) => state.expense);
  const currentYear = moment().format("YYYY");
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const monthData = [];
  const years = [];

  dates.map((year) => {
    const existingYear = years.find((ele) => ele === year.slice(-4));

    if (!existingYear) {
      years.push(year.slice(-4));
    }
  });

  const getMonthData = (year) => {
    const filteredTransactions = allTransactions.filter(
      (transaction) => moment(transaction.date).format("YYYY") === year
    );

    filteredTransactions.forEach((transaction) => {
      const formatedMonth = moment(transaction.date).format("MMM");
      const existingMonth = monthData.find(
        (item) => item.month === formatedMonth
      );

      if (existingMonth) {
        if (transaction.paymentType === "income") {
          existingMonth.income += transaction.amount;
        } else {
          existingMonth.expense += transaction.amount;
        }
      } else {
        monthData.push({
          month: formatedMonth,
          year: year,
          income: transaction.paymentType === "income" ? transaction.amount : 0,
          expense:
            transaction.paymentType === "expense" ? transaction.amount : 0,
        });
      }
    });
  };

  getMonthData(selectedYear);

  const transformedData = monthData.map((item) => ({
    label: item.month,
    income: item.income,
    expense: item.expense,
  }));

  const monthOrder = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
  };

  transformedData.sort((a, b) => {
    return monthOrder[a.label] - monthOrder[b.label];
  });

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
        text: selectedYear +" Expenses",
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
      className="d-flex align-items-center flex-column flex-lg-row h-100 flex-row gap-2"
      style={{ minWidth: "80%" }}
    >
      {chartComponent}
      <div className="d-flex flex-column gap-3 pb-5">
        <button onClick={handleChange} className="btn btn-warning">
          Change {chartType} Chart
        </button>
        <select
          className="form-control"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {
            years.map((year, index)=>{
              return (
                  <option value={year} key={index}>{year}</option>
                  )
                })
              }
        </select>
      </div>
  
    </div>
  );
};

export default ChartComponent;
