import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment"
import { getAllTransaction } from '../redux/slices/expense';
import {Link} from "react-router-dom"
import Chart from "../components/Chart"
const Stats = () => {
      const primaryColor = "#00416A";
      const { username } = useSelector((state) => state.auth);
      const { incomeBalance, expenseBalance } = useSelector((state) => state.expense);
      
      const { totalBalance , allTransactions, lastTimeFetched} = useSelector((state) => state.expense);

      
      const dispatch = useDispatch();


      useEffect(() => {
        // Check if data is already present or consider refreshing every hour (for example)
        const currentTime = new Date().getTime();
        const maxCacheAge = 3600000; // 1 hour in milliseconds

        if ((currentTime - lastTimeFetched) > maxCacheAge) {
          dispatch(getAllTransaction(username));
        }
      }, [dispatch, lastTimeFetched, username]);


      
      
  return (
    <>
      <div
          className="d-flex flex-row align-items-center bg-white"
          style={{ height: "20%", borderRadius: ".8rem" }}
        >
          <div
            style={{
              width: "40%",
              borderTopLeftRadius: ".8rem",
              borderBottomLeftRadius: ".8rem",
              backgroundColor: primaryColor,
            }}
            className="h-100 d-flex justify-content-center align-items-center flex-column gap-0 gap-lg-2 pt-2"
          >
            <h6 className="text-white" style={{fontSize: "clamp(16px, 1.8vw, 26px)"}}>Total Balance</h6>
            <p style={{ color: totalBalance > 0 ? "#aaf0d1" : "red", fontSize: "clamp(16px, 1.8vw, 26px)" }}>Rs. {totalBalance}</p>
          </div>

          <div
            style={{
              width: "33%",
              borderRight: "1px solid grey",
              height: "80%",
              color: primaryColor,
            }}
            className="d-flex justify-content-center align-items-center flex-column pt-2 gap-0 gap-lg-2"
          >
            <h6 style={{fontSize: "clamp(16px, 1.8vw, 26px)"}}>Total Income</h6>
            <p className='text-success' style={{fontSize: "clamp(16px, 1.8vw, 26px)"}}>Rs. {incomeBalance}</p>
          </div>

          <div
            style={{ width: "33%", height: "100%", color: primaryColor }}
            className="d-flex justify-content-center align-items-center flex-column gap-0 gap-lg-2 pt-2"
          >
            <h6 style={{fontSize: "clamp(16px, 1.8vw, 26px)"}}>Total Expense</h6>
            <p className='text-danger' style={{fontSize: "clamp(16px, 1.8vw, 26px)"}}>Rs. {expenseBalance}</p>
          </div>
        </div>

        <div
          style={{ height: "45%", borderRadius: ".8rem" }}
          className="p-3"
        >
          <h6 className="fs-5">Expense Stats</h6>
          <Chart/>
        </div>
        <div
          style={{ height: "45%", borderRadius: ".8rem",border: `.2rem solid ${primaryColor}`, color: `${primaryColor}`}}
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
              {
                allTransactions.length > 0 ? (
                  allTransactions.slice(-2).map((transaction, index) => (
                    <tr key={index} style={{fontSize: "clamp(14px ,2vw, 20px)"}}>
                      <td>{index+1}</td>
                      <td>{moment(transaction.date).format("MMM Do YY")}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.amount}</td>
                      <td style={{ color: transaction.paymentType === 'income' ? 'green' : 'red' }}>
                        {transaction.paymentType}
                      </td>
                      <td>{transaction.paymentMethod}</td>
                    </tr> 
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No transactions found</td>
                  </tr>
                )
              }

              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center flex-row pt-4">
            <button className="btn btn-success"><Link to="/dashboard/history" style={{textDecoration:"none", color:"white"}}>See All</Link></button>
          </div>
        </div>
    </>
  )
}

export default Stats