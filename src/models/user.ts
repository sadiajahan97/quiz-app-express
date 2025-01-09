import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  createdAt: Date;
  displayPicture: string;
  email: string;
  hashedPassword: string;
  hashedRefreshToken: string;
  name: string;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    displayPicture: {
      default: "",
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    hashedPassword: {
      required: true,
      type: String,
    },
    hashedRefreshToken: {
      default: "",
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
