import express from "express";
import { getAllUsers } from "../controller/user.js";
import { protect,isAdmin } from "../Middleware/protect.js";

const userRouter = express.Router();

userRouter.get("/", protect, isAdmin, getAllUsers); 

export default userRouter;
