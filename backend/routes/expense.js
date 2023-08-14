import express from "express";
import { addTransaction, getAllTransaction } from "../controllers/expense.js";
const router  =express.Router();
import auth from "../middleware/auth.js"


router.get("/:username",auth, getAllTransaction);
router.post("/",auth, addTransaction);

export default router;