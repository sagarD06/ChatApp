import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import { connectDB } from "./db/connect.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors("*"));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`App listening on ${PORT}`);
});
