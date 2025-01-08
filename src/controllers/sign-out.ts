import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { User } from "@quiz-app/models/user";
import { compareData } from "@quiz-app/utils/bcrypt";

export async function handleSignOut(
  request: Request<{ id: string }>,
  response: Response
): Promise<Response> {
  try {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      return response.status(400).json({
        message: "Invalid user ID format",
        statusCode: 400,
        success: false,
      });
    }

    const refreshToken = request.signedCookies?.refreshToken;

    if (!refreshToken) {
      return response.status(200).json({
        message: "No active session found",
        statusCode: 200,
        success: true,
      });
    }

    const user = await User.findById(id);

    if (!user || !user.hashedRefreshToken) {
      return response.status(200).json({
        message: "No active session found",
        statusCode: 200,
        success: true,
      });
    }

    const isMatch = await compareData(refreshToken, user.hashedRefreshToken);

    if (!isMatch) {
      return response.status(401).json({
        message: "Invalid session token",
        statusCode: 401,
        success: false,
      });
    }

    user.hashedRefreshToken = "";

    await user.save();

    response.clearCookie("refreshToken", {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      signed: true,
    });

    return response.status(200).json({
      message: "User signed out successfully",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    console.error("Sign-out error:", error);

    return response.status(500).json({
      message: "Internal server error",
      statusCode: 500,
      success: false,
    });
  }
}
