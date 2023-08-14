import Expense from "../models/expense.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const addTransaction =  async(req, res)=>{
      console.log(req.body);
      const transactionData = req.body.formData;
      const username = req.body.username
      const newTransaction = new Expense({
            ...transactionData, 
            username,
            date: new Date().toISOString()
      })

      try{
            await newTransaction.save();
            res.status(201).json(newTransaction);
      }catch(error){
            res.status(404).json({message: "Something went wrong"})
      }
}
export const getAllTransaction =  async(req, res)=>{
      
      const username = req.params.username;     
      try{           
            const data = await Expense.find({username});
            console.log(data);
            res.status(201).json(data);
      }catch(error){
            res.status(404).json({message: "Something went wrong"})
      }
}