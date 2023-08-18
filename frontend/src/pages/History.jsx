import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import Chart from 'chart.js/auto';
import { Bar, Line } from "react-chartjs-2";

const History = () => {
  const { allTransactions } = useSelector((state) => state.expense);

  const handleheaders =()=>{
    const headers = Object.keys(allTransactions[0]).toString().toLowerCase();
    
    const data = allTransactions.map((item)=>{
      return Object.values(item).toString();
    })

    const csv = [headers, ...data].join('\n');
    startCSVDownload(csv);
  }

  const startCSVDownload = (input)=>{
    const blob  = new Blob([input], { type: 'application/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = 'text-csv.csv';
    a.href= url;
    a.style.display='none';
    const history_body = document.querySelector('.history_body');
    history_body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url)

  }

  const yearData= [];
  allTransactions.map((item) => {
    const year = moment(item.date).format("YY");
    const existingYear = yearData.find(
      (entry) => moment(entry.year).format("YY") === year
    );
  
    if (existingYear) {
      existingYear.data.push(item); 
    } else {
      yearData.push({ year: item.date, data: [item] });
    }
  });

  yearData.forEach((item) => {
    let income = 0; 
    let expense = 0; 
    item.data.forEach((ele) => {
      if (ele.paymentType === "income") {
        income += ele.amount;
      } else {
        expense += ele.amount;
      }
    });
  
    item.totalIncome = income;
    item.totalExpense = expense;
  });


  const ChartData = {
    labels: yearData.map((item) => moment(item.year).format("YY")), // Labels for X-axis
    datasets: [
      {
        data: yearData.map((item) => item.totalIncome), // Income data
        label: "Income",
        borderColor: "#007bff",
        fill: true,
        lineTension: 0.5,
      },
      {
        data: yearData.map((item) => item.totalExpense), // Expense data
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
  return (
    <div
      style={{ height: "80%%", borderRadius: ".8rem" , background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)", fontFamily:" 'Inconsolata', monospace "}}
      className="p-3 history_body"
    >
      <h6 className="fs-5">Transition History</h6>
      <div className="d-flex justify-content-center flex-row pt-4">
      <table className="w-100 w-lg-75">
              <thead style={{ fontSize: "clamp(14px, 1.8vw, 18px)" }}>
            <tr>
              <th>S.No.</th>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Payment Type</th>
              <th>Payment Method</th>
            </tr>
          </thead>
          <tbody>
            
            {allTransactions.map((transaction, index) => (
              <tr key={index} style={{fontSize: "clamp(14px ,2vw, 20px)"}}>
                <td>{index+1}</td>
                <td>{moment(transaction.date).format("MMM Do YY")}</td>
                <td>{transaction.category}</td>
                <td>{transaction.amount}</td>
                <td
                  style={{
                    color:
                      transaction.paymentType === "income" ? "green" : "red",
                  }}
                >
                  {transaction.paymentType}
                </td>
                <td>{transaction.paymentMethod}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
        <button onClick={handleheaders}>Download CSV</button>

        <Bar options={options} data={ChartData} width={"100%"} height={"50%"} />
    </div>
  );
};

export default History;
