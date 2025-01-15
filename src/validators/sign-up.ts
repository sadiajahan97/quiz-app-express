import { z } from "zod";

export const signUpSchema = z
  .object({
    confirmPassword: z
      .string()
      .nonempty("Confirmation of password is required"),
    displayPicture: z
      .string()
      .url("URL format for display picture is invalid")
      .optional(),
    email: z
      .string()
      .email("Email format is invalid")
      .nonempty("Email is required"),
    name: z
      .string()
      .trim()
      .nonempty("Name is required")
      .max(100, "Name is too long"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character",
        }
      )
      .nonempty("Password is required"),
  })
  .refine(
    (data) => !data.confirmPassword || data.confirmPassword === data.password,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );
