import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
      email: {type:String, required:true },
      password: {type:String, required: false },
})

export default mongoose.model("User", userSchema);