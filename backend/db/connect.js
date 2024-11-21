import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to DB!");
  } catch (error) {
    console.error("Something went wrong while connecting DB", error.message);
  }
};
