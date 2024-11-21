import jwt from "jsonwebtoken";
import "dotenv/config.js";
import { User } from "../models/user.model.js";

export const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({
        message: "User not authenticated - Invalid token",
        success: false,
      });
    }
    const user = await User.findById({ _id: verifiedToken.userId });
    if (!user) {
      return res
        .status(401)
        .json({
          message: "User not authenticated - User not found",
          success: false,
        });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Something went wrong in uerAuth middleware.");
    return res.status(500).json({ message: error.message, success: false });
  }
};
