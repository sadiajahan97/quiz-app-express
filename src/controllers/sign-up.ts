import { Request, Response } from "express";
import { mongo } from "mongoose";
import { z } from "zod";

import { User } from "@quiz-app/models/user";
import { hashData } from "@quiz-app/utils/bcrypt";
import { signUpSchema } from "@quiz-app/validators/sign-up";

export async function handleSignUp(
  request: Request<unknown, unknown, z.infer<typeof signUpSchema>>,
  response: Response
): Promise<Response> {
  try {
    const validatedData = signUpSchema.parse(request.body);

    const { displayPicture, email, name, password } = validatedData;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).json({
        data: null,
        error: "Email already exists",
        status: 409,
      });
    }

    const hashedPassword = await hashData(password);

    const newUser = new User({
      displayPicture,
      email,
      hashedPassword,
      name,
    });

    const savedUser = await newUser.save();

    return response.status(201).json({
      data: {
        displayPicture: savedUser.displayPicture,
        email: savedUser.email,
        name: savedUser.name,
      },
      error: null,
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationError[path] = err.message;
      }

      return response.status(400).json({
        data: null,
        error: validationError,
        status: 400,
      });
    }

    if (error instanceof mongo.MongoError && error.code === 11000) {
      return response.status(409).json({
        data: null,
        error: "Email already exists",
        status: 409,
      });
    }

    return response.status(500).json({
      data: null,
      error: "Internal server error",
      status: 500,
    });
  }
}
