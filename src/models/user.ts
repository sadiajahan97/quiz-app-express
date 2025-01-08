import { Document, Schema, model } from "mongoose";
import { z } from "zod";

interface IUser extends Document {
  createdAt: Date;
  displayPicture: string;
  email: string;
  hashedPassword: string;
  hashedRefreshToken: string;
  name: string;
  updatedAt: Date;
}

const userMongooseSchema = new Schema<IUser>(
  {
    displayPicture: {
      default: "",
      type: String,
      validate: {
        message: "Display picture must be a valid URL.",
        validator: (value: string): boolean =>
          !value || /^https?:\/\/[^\s]+$/.test(value),
      },
    },
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
      validate: {
        message: "Email format is invalid.",
        validator: function (value: string): boolean {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
      },
    },
    hashedPassword: {
      minlength: 60,
      required: true,
      type: String,
    },
    hashedRefreshToken: {
      default: "",
      type: String,
      validate: {
        message: "Refresh token must be at least 60 characters long.",
        validator: (value: string): boolean => !value || value.length >= 60,
      },
    },
    name: {
      required: true,
      trim: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const userZodSchema = z
  .object({
    confirmPassword: z
      .string()
      .nonempty("Confirmation of password is required."),
    displayPicture: z
      .string()
      .url("URL format for display picture is invalid.")
      .optional(),
    email: z
      .string()
      .nonempty("Email is required.")
      .email("Email format is invalid."),
    name: z.string().nonempty("Name is required."),
    password: z
      .string()
      .nonempty("Password is required.")
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ),
        {
          message:
            "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const User = model<IUser>("User", userMongooseSchema);
