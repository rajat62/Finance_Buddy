import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
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
    </div>
  );
};

export default History;
