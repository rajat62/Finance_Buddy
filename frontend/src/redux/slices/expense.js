import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment"
const API = axios.create({baseURL: "http://localhost:8000/expense/"});
API.interceptors.request.use((req) => {
      const profile = JSON.parse(localStorage.getItem("profile"));
      if (profile && profile.token) {
        req.headers.Authorization = `Bearer ${profile.token}`;
      }
      return req;
    });
    

export const getAllTransaction = createAsyncThunk(
  "auth/getAllTransaction",
  async ( username, thunkAPI) => {
    
    try {
      const response = await API.get(`${username}`,);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("User already exists");
    }
  }
);

export const addTransaction = createAsyncThunk(
  "auth/addTransaction",
  async ({username, formData}, thunkAPI) => {
    try {
      const response = await API.post("", {username, formData});
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("User already exists");
    }
  }
);

export const expenseSlice = createSlice({
      name: "expense",
      initialState: {
        lastTimeFetched:"",
        allTransactions: [],
        incomeBalance:0,
        expenseBalance:0,
        totalBalance:0,
        dates:[],
        aggregatedCategories:[],
        selectedDate: "",
        monthData:[]
      },
      reducers: {
        
      },
      extraReducers(builder){
        builder
              .addCase(addTransaction.pending, (state,action)=>{
                    state.loading =true;
              })
              .addCase(addTransaction.fulfilled, (state, action)=>{
                    state.loading=  false;
                    state.allTransactions= [...state.allTransactions, action.payload];
                    if (action.payload.paymentType === "income") {
                      state.incomeBalance= state.incomeBalance+action.payload.amount
                    }
                    else{
                      state.expenseBalance= state.expenseBalance+action.payload.amount
                    }
                    state.totalBalance = state.incomeBalance-state.expenseBalance;

                    state.monthData=[];


                    state.allTransactions.forEach((transaction) => {
                      const { category, amount, paymentType, date } = transaction;
                      const formatedDate = moment(date).format("MMM");

                      const existingCategory = state.aggregatedCategories.find(
                        (item) => item.category === category
                      );
              
                      if (existingCategory) {
                        existingCategory.amount += amount;
                      } else {
                        state.aggregatedCategories.push({ category, amount });
                      }
                      const existingMonth = state.monthData.find((item) => item.month === formatedDate);

                      if (existingMonth) {
                        if (paymentType === "income") {
                          existingMonth.income += amount;
                        } else {
                          existingMonth.expense += amount;
                        }
                      } else {
                        state.monthData.push({ month: formatedDate, income: paymentType === "income" ? amount : 0, expense: paymentType === "expense" ? amount : 0 });
                      }

                    });

                    
                    state.dates = [...state.dates, moment(action.payload.date).format("MMM Do YY")]
              })
              .addCase(addTransaction.rejected, (state, action)=>{
                    state.loading=  false;
                    state.error = action.payload.message;
              })
              .addCase(getAllTransaction.pending, (state,action)=>{
                    state.loading =true;
              })
              .addCase(getAllTransaction.fulfilled, (state, action)=>{
                    state.loading=  false;
                    state.lastTimeFetched = new Date().getTime();
                    state.allTransactions= action.payload;
                    action.payload.forEach(transaction => {
                      if (transaction.paymentType === "income") {
                        state.incomeBalance += transaction.amount;
                      }
                      else{
                        state.expenseBalance += transaction.amount;
                      }
                    });
                    state.totalBalance = state.incomeBalance-state.expenseBalance;
                    state.dates = action.payload.map(transaction =>
                      moment(transaction.date).format("MMM Do YY")
                    );
                    
                    action.payload.forEach((transaction) => {
                      const { category, amount, date, paymentType } = transaction;
                      const formatedDate = moment(date).format("MMM");
                      
                      const existingCategory = state.aggregatedCategories.find(
                        (item) => item.category === category
                      );
              
                      if (existingCategory) {
                        existingCategory.amount += amount;
                      } else {
                        state.aggregatedCategories.push({ category, amount });
                      }

                      const existingMonth = state.monthData.find((item) => item.month === formatedDate);

                      if (existingMonth) {
                        if (paymentType === "income") {
                          existingMonth.income += amount;
                        } else {
                          existingMonth.expense += amount;
                        }
                      } else {
                        state.monthData.push({ month: formatedDate, income: paymentType === "income" ? amount : 0, expense: paymentType === "expense" ? amount : 0 });
                      }

                    });

              })
              .addCase(getAllTransaction.rejected, (state, action)=>{
                    state.loading=  false;
                    state.error = "Cannot get data";
              })
      }
})

export const {} = expenseSlice.actions;

export default expenseSlice.reducer;