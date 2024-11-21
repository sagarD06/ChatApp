import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    return res.status(200).json({
      users,
      success: true,
    });
  } catch (error) {
    console.log("Something went wrong in getUsers controller.");
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
