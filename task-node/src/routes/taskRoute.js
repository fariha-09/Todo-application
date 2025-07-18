import express from "express";
import { getAllTask,updateTask,deleteTask,addTask,getAllTasksForAdmin } from "../controller/tasks.js";
import { protect,isAdmin } from "../Middleware/protect.js";

const router=express.Router();

router.get("/",protect,getAllTask);
router.get("/all", protect, isAdmin, getAllTasksForAdmin);
router.post("/",protect,addTask);
router.put("/:id",protect,updateTask);
router.delete("/:id",protect,deleteTask);


export default router;