import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const BASE_URL = "http://localhost:8000/users/";

export const register = createAsyncThunk(
  "auth/register",
  async ({ formData, navigate, toast }, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + "signup", formData);
      toast.success("User Added successfully");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("User already exists");
    }
  }
);
export const getUser = createAsyncThunk(
  "auth/getUser",
  async ({ formData, navigate, toast }, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL + "login", formData);
      toast.success("Logged in");
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("User already exists");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: "",
    username: "",
    loading: false,
    error: "",
  },
  reducers: {
    logoutUser(state) {
      state.username="";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.username = action.payload.email.split("@")[0];
        localStorage.setItem("profile",JSON.stringify(action.payload.token));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = "failed to get user";
      })
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.username = action.payload.email.split("@")[0];
        localStorage.setItem("profile",JSON.stringify(action.payload.token));
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

// this is for dispatch
export const {logoutUser} = authSlice.actions;

// this is for configureStore
export default authSlice.reducer;
