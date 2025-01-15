import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import { User } from "@quiz-app/models/user";
import { Authentication } from "@quiz-app/types/authentication";
import { compareData } from "@quiz-app/utils/bcrypt";

export async function handleSignOut(
  request: Request<unknown, unknown, Authentication>,
  response: Response
): Promise<void> {
  try {
    const { id } = request.body.authentication;

    if (!isValidObjectId(id)) {
      response.status(400).json({
        data: null,
        message: "Invalid user ID format",
        status: 400,
      });

      return;
    }

    const refreshToken = request.signedCookies?.refreshToken;

    if (!refreshToken) {
      response.status(401).json({
        data: null,
        message: "Refresh token is missing",
        status: 401,
      });

      return;
    }

    const user = await User.findById(id);

    if (!user || !user.hashedRefreshToken) {
      response.status(404).json({
        data: null,
        message: "User not found",
        status: 404,
      });

      return;
    }

    const isMatch = await compareData(refreshToken, user.hashedRefreshToken);

    if (!isMatch) {
      response.status(401).json({
        data: null,
        message: "Invalid refresh token",
        status: 401,
      });

      return;
    }

    user.hashedRefreshToken = "";

    await user.save();

    response.clearCookie("refreshToken", {
      httpOnly: true,
      signed: true,
    });

    response.status(200).json({
      data: null,
      message: "User signed out successfully",
      status: 200,
    });
  } catch (error) {
    console.error(error);

    response.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
}
