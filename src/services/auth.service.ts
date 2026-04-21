import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apiError";

const sanitizeUser = (user: any) => {
  const obj = user.toObject();
  delete obj.password;
  return obj;
};

export const registerUser = async (email: string, password: string) => {
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    email,
    password: hashedPassword,
  });

  return sanitizeUser(user);
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  return sanitizeUser(user);
};
