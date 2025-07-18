import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token found" });
    }

       console.log("🧪 JWT Secret in memory:", process.env.JWT_SECRET?.slice(0, 10) + "...");
console.log("🧪 Token from cookie:", req.cookies.token);
    console.log("🔐 Received cookies:", req.cookies);
    console.log("🧪 Is JWT_SECRET undefined?", process.env.JWT_SECRET === undefined);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded token:", decoded); 
    const user = await Users.findById(decoded.id).select("-password");
 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
};

