import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from 'mongoose';
import authRouter from "./src/routes/auth.js";
import router from "./src/routes/taskRoute.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/adminsRoute.js";

const app=express();
app.use(express.json())

app.use(cookieParser());
 app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use("/api",authRouter);
app.use("/users",userRouter);
app.use("/tasks",router);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
 .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

 

app.get("/", (req, res) => {
  res.send("Server is running!");
});


const PORT=process.env.PORT || 5001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});