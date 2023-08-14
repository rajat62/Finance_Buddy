import express from "express";
import { addCategory, getCategories } from "../controllers/category.js";
import auth from "../middleware/auth.js"
const router  = express.Router();

router.get('/getCategories',auth, getCategories);
router.post('/addCategory',auth, addCategory);

export default router;