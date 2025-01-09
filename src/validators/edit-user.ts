import { z } from "zod";

export const editUserSchema = z
  .object({
    displayPicture: z
      .string()
      .url("URL format for display picture is invalid.")
      .optional(),
    email: z.string().email("Email format is invalid.").optional(),
    name: z.string().trim().max(100, "Name is too long.").optional(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.",
        }
      )
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update.",
  });
