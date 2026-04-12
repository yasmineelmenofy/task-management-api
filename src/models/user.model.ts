import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model<User>("User", UserSchema);
