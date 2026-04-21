import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { registerUser, loginUser } from "../services/auth.service";
import { generateToken } from "../utils/generateToken";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await registerUser(email, password);

    const token = generateToken(user._id.toString());

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user,
        token,
      },
    });
  },
);

export const loginController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await loginUser(email, password);

    const token = generateToken(user._id.toString());

    res.status(200).json({
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  },
);
