import { Request, Response } from "express";
import { z } from "zod";

import { authZodSchema } from "@quiz-app/models/auth";
import { User } from "@quiz-app/models/user";
import { compareData, hashData } from "@quiz-app/utils/bcrypt";
import { createTokens } from "@quiz-app/utils/jsonwebtoken";

export async function handleSignIn(
  request: Request<unknown, unknown, z.infer<typeof authZodSchema>>,
  response: Response
): Promise<Response> {
  try {
    const validatedData = authZodSchema.parse(request.body);

    const { email, password } = validatedData;

    const user = await User.findOne({ email });

    if (!user || !user.hashedPassword) {
      return response.status(401).json({
        message: "Invalid email or password",
        statusCode: 401,
        success: false,
      });
    }

    const isMatch = await compareData(password, user.hashedPassword);

    if (!isMatch) {
      return response.status(401).json({
        message: "Invalid email or password",
        statusCode: 401,
        success: false,
      });
    }

    const { accessToken, refreshToken } = createTokens(
      email,
      user._id as string
    );

    const hashedRefreshToken = await hashData(refreshToken);

    await User.findOneAndUpdate({ email }, { hashedRefreshToken });

    response.cookie("jsonwebtoken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return response.status(200).json({
      data: {
        accessToken,
      },
      message: "User logged in successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Sign-in error:", error);

    if (error instanceof z.ZodError) {
      return response.status(400).json({
        errors: error.errors,
        message: "Validation failed",
        statusCode: 400,
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
