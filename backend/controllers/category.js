import Category from "../models/categories.js";

export const addCategory = async (req, res)=>{

      const categoryName = req.body.formData.name;
      const username = req.body.formData.username;
      await Category.create({
            username, categoryName
      });
      res.send("Added Successfully")
}
export const getCategories = async (req, res)=>{
      const username = req.query.username;
      const data = await Category.find({username: username});
      res.json(data);
}

export const deleteCategory = async (req, res)=>{
      const itemName = req.query.itemName;
      const username = req.query.username;

      try {
            const response  = await Category.deleteOne({username, categoryName: itemName});
            res.send("Category Deleted Successfully");
      } catch (error) {
            res.status(500).send({message: "Something went wrong"});
      }
}