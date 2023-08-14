import express from "express";
import bodyParser from "body-parser";
import cors  from "cors";
import UserRouter from "./routes/user.js";
import ExpenseRouter from "./routes/expense.js";
import CategoryRouter from "./routes/category.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const app = express();

app.use(express.json({ limit: "30mb", extended: "true" }));
app.use(express.urlencoded({ limit: "30mb", extended: "true" }));
app.use(cors());
app.use(bodyParser.json());

app.use("/users", UserRouter)
app.use("/expense", ExpenseRouter)
app.use("/category", CategoryRouter)
const mongoURL = `mongodb+srv://${process.env.CLUSTER}:${process.env.PASSWORD}@cluster0.qqmjyq5.mongodb.net/`;

mongoose.connect(mongoURL).then(()=>{
  app.listen(process.env.PORT, ()=>{
        console.log(`server running on the port number ${process.env.PORT} `)
  })
}).catch((err)=>{console.log(err)})
