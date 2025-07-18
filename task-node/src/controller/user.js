import Users from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res) => {
  try {
    const {username, email, password,confirmPassword } = req.body;
    if ( !username || !email || !password  || !confirmPassword){
        return res.status(400).json({
        message: "All fields are required.",
      });
    }
      
    console.log(req.body);

    const existingUser =await Users.findOne({ email });
    if (existingUser) {
      return res.status(422).json({
        message:
          "User with this email already exists.kindly enter valid email.",
        data: "existingUser",
      });
    }
    if (password !== confirmPassword) {
      return res.status(409).json({
        message: "Password mismatch with confirm password.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      username,
      password: hashedPassword,
      email,
      
    });
    await newUser.save();

    res.status(200).json({
      message: "User added successfully.",
    });
  } catch (error) {
    console.log("error is:", error);
    res.status(409).json({
      message: "error fetching users data",
      error: error,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
console.log("req.body is",req.body)
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }
    

    const existingUser = await Users.findOne({ email });
console.log("existingUser is",existingUser)
    if (!existingUser) {
      return res.status(209).json({
        message: "User not found with this email.Kindly enter correct email.",
      });
    }

    const isUser = await bcrypt.compare(password, existingUser.password);
    if (!isUser) {
      return res.status(209).json({
        message: "Invalid password.Enter correct password.",
      });
    }

    const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET);
    console.log("🔑 Signing token with:", process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,         
  sameSite: "Lax",      
  maxAge: 24 * 60 * 60 * 1000, 
    });

   

    res.status(200).json({
      message: "User logged in successfully.",
  token,
  isAdmin: existingUser.isAdmin,
    });
  } catch (error) {
    res.status(409).json({
      message: "error signingin user....",
      error,
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password"); // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};