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
        data: null,
        error: "Invalid user ID format",
        status: 400,
      });
    }

    const refreshToken = request.signedCookies?.refreshToken;

    if (!refreshToken) {
      return response.status(401).json({
        data: null,
        error: "Invalid session token",
        status: 401,
      });
    }

    const user = await User.findById(id);

    if (!user || !user.hashedRefreshToken) {
      return response.status(401).json({
        data: null,
        error: "Invalid session token",
        status: 401,
      });
    }

    const isMatch = await compareData(refreshToken, user.hashedRefreshToken);

    if (!isMatch) {
      return response.status(401).json({
        data: null,
        error: "Invalid session token",
        status: 401,
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
      data: null,
      error: null,
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return response.status(500).json({
      data: null,
      error: "Internal server error",
      status: 500,
    });
  }
}
