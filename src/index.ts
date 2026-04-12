import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db";
import taskRoutes from "./routes/task.routes";
import { errorMiddleware } from "./middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Security
app.use(helmet());

//  Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//  Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
});

app.use("/api", limiter);
//  Body parser
app.use(express.json());

//  Health check
app.get("/", (req, res) => {
  res.send("Task Management API is running");
});

//  Routes
app.use("/api/tasks", taskRoutes);
//  Error middleware
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
