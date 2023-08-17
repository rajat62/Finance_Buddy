import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = axios.create({baseURL: "http://localhost:8000/category/"});
API.interceptors.request.use((req) => {
      const profile = JSON.parse(localStorage.getItem("profile"));
      if (profile && profile.token) {
        req.headers.Authorization = `Bearer ${profile.token}`;
      }
      return req;
});

export const getCategories = createAsyncThunk(
      "category/getCategories",
      async ( username, thunkAPI) => {
        
        try {
          const response = await API.get( `/getCategories?username=${username}`, );
          return response.data
        } catch (error) {
          console.log(error);
          return thunkAPI.rejectWithValue("User already exists");
        }
      }
    );
export const addCategory = createAsyncThunk(
      "category/addCategory",
      async ( formData, thunkAPI) => {
        
        try {
          const response = await API.post( "/addCategory", {formData});
          console.log(response.data);
          return formData.name
        } catch (error) {
          console.log(error);
          return thunkAPI.rejectWithValue("User already exists");
        }
      }
    );

const categorySlice = createSlice({
      name: "category",
      initialState:{
            categories:[],
      },
      reducers: {

      },extraReducers(builder){
            builder
                  .addCase(addCategory.pending, (state,action)=>{
                        state.loading =true;
                  })
                  .addCase(addCategory.fulfilled, (state, action)=>{
                       state.categories = [...state.categories, action.payload]
                  })
                  .addCase(addCategory.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
                  .addCase(getCategories.pending, (state,action)=>{
                        state.loading =true;
                  })
                  .addCase(getCategories.fulfilled, (state, action)=>{

                        action.payload.forEach(element => {
                              state.categories = [...state.categories, element.categoryName]
                        });

                  })
                  .addCase(getCategories.rejected, (state, action)=>{
                        state.loading=  false;
                        state.error = action.payload.message;
                  })
      }
})

export const {} = categorySlice.actions;

export default categorySlice.reducer;