import { Request, Response } from "express";
import { z } from "zod";

import { User } from "@quiz-app/models/user";
import { compareData, hashData } from "@quiz-app/utils/bcrypt";
import { createTokens } from "@quiz-app/utils/jsonwebtoken";
import { signInSchema } from "@quiz-app/validators/sign-in";

export async function handleSignIn(
  request: Request<unknown, unknown, z.infer<typeof signInSchema>>,
  response: Response
): Promise<Response> {
  try {
    const validatedData = signInSchema.parse(request.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (!user || !user.hashedPassword) {
      return response.status(401).json({
        data: null,
        error: "Invalid email or password",
        status: 401,
      });
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      return response.status(401).json({
        data: null,
        error: "Invalid email or password",
        status: 401,
      });
    }

    const { accessToken, refreshToken } = createTokens(
      email,
      user._id as string
    );

    const hashedRefreshToken = await hashData(refreshToken);

    user.hashedRefreshToken = hashedRefreshToken;

    await user.save();

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    });

    return response.status(200).json({
      data: {
        accessToken,
      },
      error: null,
      status: 200,
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

    return response.status(500).json({
      data: null,
      error: "Internal server error",
      status: 500,
    });
  }
}
