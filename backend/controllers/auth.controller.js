import bcrypt from "bcrypt";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

/******************************* SIGNUP CONTROLLER *****************************/
export const signUpUser = async (req, res) => {
  try {
    const { fullname, username, password, gender } = req.body;

    if (!fullname || !username || !password || !gender) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullname,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "Male" ? boyProfilePic : girlProfilePic,
    });

    if (!newUser) {
      return res.status(400).json({
        message: "Failed to create user",
        success: false,
      });
    }
    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);
    return res.status(201).json({
      message: "User signed up successfully",
      success: true,
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        username: newUser.username,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.log("Error in signup controller");
    return res.status(500).json({
      message: "Error while signing up user",
      success: false,
      error: error,
    });
  }
};

/******************************* SIGNIN CONTROLLER *****************************/
export const signInUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password || ""
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }

    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      message: "User signed in successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Error in signin controller");
    return res.status(500).json({
      message: "Error while signing in user",
      success: false,
      error: error,
    });
  }
};

/******************************* SIGNOUT CONTROLLER *****************************/
export const signOutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
      message: "User signed out successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in signout controller");
    return res.status(500).json({
      message: "Error while signing out user",
      success: false,
      error: error,
    });
  }
};
