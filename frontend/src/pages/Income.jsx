import React from 'react'
import moment from 'moment';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
const Income = () => {

  const {allTransactions} = useSelector((state)=> state.expense)

  let incomeData = allTransactions.filter((item)=>{
    return item.paymentType === "income";
  })

  return (
    
      <div
      style={{ height: "auto", borderRadius: ".8rem" , background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)", fontFamily:" 'Inconsolata', monospace "}}
      className="p-3"
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
            {incomeData.map((transaction, index) => (
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
    </div>
    
  )
}

export default Income