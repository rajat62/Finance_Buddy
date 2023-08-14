import mongoose, { mongo } from "mongoose";

const categorySchema = mongoose.Schema({
      username: {type:String, required: true},
      categoryName: {type: String, required:true}
});

export default mongoose.model("Category", categorySchema);