import express from "express";
const router  = express.Router();
import { login, signup } from "../controllers/user.js";

router.post("/signup", signup);
router.post("/login", login);

export default router;