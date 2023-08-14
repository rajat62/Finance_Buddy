import { configureStore } from '@reduxjs/toolkit';
import authReducer from  "./slices/auth.js";
import expenseReducer from "./slices/expense.js"
export default configureStore({
  reducer: {
    auth :authReducer,
    expense : expenseReducer
  },
});