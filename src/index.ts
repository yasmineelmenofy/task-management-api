import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// connect database
connectDB();

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Task Management API is Running");
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
