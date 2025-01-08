import { Request, Response } from "express";
import { mongo } from "mongoose";
import { z } from "zod";

import { User, userZodSchema } from "@quiz-app/models/user";
import { hashData } from "@quiz-app/utils/bcrypt";

export async function handleSignUp(
  request: Request<unknown, unknown, z.infer<typeof userZodSchema>>,
  response: Response
): Promise<Response> {
  try {
    const validatedData = userZodSchema.parse(request.body);

    const { displayPicture, email, name, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).json({
        message: "Email already exists",
        statusCode: 409,
        success: false,
      });
    }

    const hashedPassword = await hashData(password);

    const newUser = new User({
      displayPicture: displayPicture || "",
      email,
      hashedPassword,
      name,
    });

    await newUser.save();

    return response.status(201).json({
      message: "User signed up successfully",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    console.error("Sign-up error:", error);

    if (error instanceof z.ZodError) {
      return response.status(400).json({
        errors: error.errors,
        message: "Validation failed",
        statusCode: 400,
        success: false,
      });
    }

    if (error instanceof mongo.MongoError && error.code === 11000) {
      return response.status(409).json({
        message: "Email already exists",
        statusCode: 409,
        success: false,
      });
    }

    return response.status(500).json({
      message: "Internal server error",
      statusCode: 500,
      success: false,
    });
  }
}
