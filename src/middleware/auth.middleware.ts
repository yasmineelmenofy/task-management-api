import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";

export const protect = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Not authorized");
  }

  const token = authHeader.split(" ")[1];

  // ✅ FIX: ensure token exists
  if (!token) {
    throw new ApiError(401, "Token missing");
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as unknown as { id: string };

    (req as any).user = decoded;

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid token");
  }
};
