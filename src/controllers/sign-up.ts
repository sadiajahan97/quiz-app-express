import { Request, Response } from "express";
import { mongo } from "mongoose";
import { z } from "zod";

import { User } from "@quiz-app/models/user";
import { hashData } from "@quiz-app/utils/bcrypt";
import { signUpSchema } from "@quiz-app/validators/sign-up";

export async function handleSignUp(
  request: Request<unknown, unknown, z.infer<typeof signUpSchema>>,
  response: Response
): Promise<void> {
  try {
    const { displayPicture, email, name, password } = signUpSchema.parse(
      request.body
    );

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      response.status(409).json({
        data: null,
        message: "Email already exists",
        status: 409,
      });

      return;
    }

    const hashedPassword = await hashData(password);

    const newUser = new User({
      displayPicture,
      email,
      hashedPassword,
      name,
    });

    const savedUser = await newUser.save();

    response.status(201).json({
      data: {
        displayPicture: savedUser.displayPicture,
        email: savedUser.email,
        name: savedUser.name,
      },
      message: "User signed up successfully",
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationErrors: Record<string, string> = {};

      for (const err of error.errors) {
        const path = err.path.join(".");

        validationErrors[path] = err.message;
      }

      response.status(400).json({
        data: null,
        message: validationErrors,
        status: 400,
      });

      return;
    }

    if (error instanceof mongo.MongoError && error.code === 11000) {
      response.status(409).json({
        data: null,
        message: "Email already exists",
        status: 409,
      });

      return;
    }

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}
