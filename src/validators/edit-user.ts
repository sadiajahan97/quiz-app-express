import { z } from "zod";

export const editDisplayPictureSchema = z.object({
  displayPicture: z
    .string()
    .url("Display picture must be a valid URL")
    .optional(),
  password: z.string().nonempty("Password is required"),
});

export const editEmailSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().nonempty("Password is required"),
});

export const editNameSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty("Name is required")
    .max(100, "Name is too long"),
  password: z.string().nonempty("Password is required"),
});

export const editPasswordSchema = z
  .object({
    confirmNewPassword: z
      .string()
      .nonempty("Confirmation of password is required"),
    newPassword: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      ),
    oldPassword: z.string().nonempty("Password is required"),
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
