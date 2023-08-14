import mongoose, { mongo } from "mongoose";

const expenseSchema = mongoose.Schema({
      paymentType: { type: String, enum: ["expense", "income"], required: true },
      paymentMethod: { type: String, enum: ["online", "cash"], required: true },
      category: { type: String, required: true },
      amount: { type: Number, required: true },
      date: { type: Date, required: true },
      username: {type:String, required: true}
});

export default mongoose.model("Expense", expenseSchema);