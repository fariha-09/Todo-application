import express from "express";

import { signIn,signUp } from "../controller/user.js";

const authRouter=express.Router();

authRouter.post("/register",signUp)
authRouter.post("/login",signIn)


export default authRouter;