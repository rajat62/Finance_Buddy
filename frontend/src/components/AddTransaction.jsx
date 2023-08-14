import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../redux/slices/expense";

const AddTransaction = () => {
  const { username } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const categories = [
    "Fashion", "Food", "Electronics", "Travel", "Household", "salary"
  ]
  const [formData, setFormData] = useState({
    paymentMethod: "online",
    paymentType: "expense",
    category: categories[0],
    amount: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addTransaction({username, formData}));
  };

  return (
    <div className="w-100  d-flex flex-column align-items-center">
      <h6 className="fs-3 pt-4 pb-1">Add Transaction</h6>

      {/* Add Transaction Form */}
      <form
        action=""
        className="d-flex flex-column gap-2"
        style={{ width: "80%", fontSize: "1.2rem"}}
        onSubmit={handleSubmit}
      >
        <div class="form-group">
          <label for="exampleFormControlSelect1">Payment Type:</label>

          <select
            className="form-control"
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect2">Payment Method:</label>
          <select
            name="paymentMethod"
            className="form-control"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="online">Online</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlSelect3">Category:</label>
          <select
            name="category"
            className="form-control"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {
              categories.map((item)=>{
                return (
                  <option value={item}>{item}</option>
                )
              })
            }
            
          </select>
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1">Amount:</label>
          <input
            type="text"
            name="amount"
            className="form-control"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>

        <button className="btn btn-success" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
