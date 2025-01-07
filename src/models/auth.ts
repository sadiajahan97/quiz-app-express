import { z } from "zod";

export const authZodSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Email format is invalid."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Password must be at least 8 characters long."),
});
