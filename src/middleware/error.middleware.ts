import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { ApiError } from "../utils/apiError";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      type: "ApiError",
      message: err.message,
    });
    return;
  }

  // Zod validation errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      type: "ValidationError",
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // Invalid Mongo ObjectId
  if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({
      success: false,
      type: "CastError",
      message: `Invalid ${err.path}: ${err.value}`,
    });
    return;
  }

  // Duplicate key error (unique fields)
  if ((err as any)?.code === 11000) {
    res.status(400).json({
      success: false,
      type: "DuplicateKeyError",
      message: "Duplicate field value",
      details: (err as any).keyValue,
    });
    return;
  }

  // Mongoose schema validation
  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      success: false,
      type: "DatabaseValidationError",
      message: "Database validation failed",
      errors: Object.values(err.errors).map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
    return;
  }

  // Fallback error
  res.status(500).json({
    success: false,
    type: "InternalServerError",
    message: "Something went wrong",
  });
};