import mongoose from "mongoose";

let isConnected = 0;

export const connectDB = async () => {
  console.log(isConnected)
  if (isConnected) {
    console.log("Db is already connected!");
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.MONGO_DB_URI}` || "");
    isConnected = db.connections[0].readyState;
    console.log("Mongo Db is connected!");
  } catch (error) {
    console.log("Mongo Db connection failed!", error);
    process.exit(1);
  }
};
