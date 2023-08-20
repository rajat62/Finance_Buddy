import express from "express";
import { addCategory, deleteCategory, getCategories } from "../controllers/category.js";
import auth from "../middleware/auth.js"
const router  = express.Router();

router.get('/getCategories',auth, getCategories);
router.post('/addCategory',auth, addCategory);
router.delete('/deleteCategory',auth, deleteCategory);

export default router;