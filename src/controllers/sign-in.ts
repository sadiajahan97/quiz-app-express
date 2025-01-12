import { Request, Response } from "express";
import { z } from "zod";

import { User } from "@quiz-app/models/user";
import { compareData, hashData } from "@quiz-app/utils/bcrypt";
import { createTokens } from "@quiz-app/utils/jsonwebtoken";
import { signInSchema } from "@quiz-app/validators/sign-in";

export async function handleSignIn(
  request: Request<unknown, unknown, z.infer<typeof signInSchema>>,
  response: Response
): Promise<void> {
  try {
    const { email, password } = signInSchema.parse(request.body);

    const user = await User.findOne({ email });

    if (!user || !user.hashedPassword) {
      response.status(401).json({
        data: null,
        message: "Invalid email or password",
        status: 401,
      });
      return;
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      response.status(401).json({
        data: null,
        message: "Invalid email or password",
        status: 401,
      });
      return;
    }

    const { accessToken, refreshToken } = createTokens(
      email,
      user._id as string
    );

    user.hashedRefreshToken = await hashData(refreshToken);

    await user.save();

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    });

    response.status(200).json({
      data: {
        accessToken,
      },
      message: "User signed in successfully",
      status: 200,
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

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}
