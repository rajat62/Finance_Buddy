import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import moment from "moment"
const Filtered = () => {
      const { id } = useParams(); 
      const {allTransactions } = useSelector((state)=> state.expense)
      const filteredTransactions  = allTransactions.filter((item)=>{
            return moment(item.date).format('MMM Do YY') === id
      })
  return (
      <div
      style={{
        height: "auto",
        borderRadius: ".8rem",
        background: "linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)",
        fontFamily: " 'Inconsolata', monospace ",
      }}
      className="p-3"
    >
      <h6 className="fs-5"> {id} Transactions</h6>
      <div className="d-flex justify-content-center flex-row pt-4">
        <table className="w-75">
          <thead style={{ fontSize: "1.4rem" }}>
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
            
            {filteredTransactions.map((transaction, index) => (
              
              <tr key={index} style={{ fontSize: "1.3rem" }}>
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

export default Filtered