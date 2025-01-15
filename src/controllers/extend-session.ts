import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { isValidObjectId } from "mongoose";

import { User } from "@quiz-app/models/user";
import { Authentication } from "@quiz-app/types/authentication";
import { TokenPayload } from "@quiz-app/types/jsonwebtoken";
import { compareData } from "@quiz-app/utils/bcrypt";
import { createAccessToken } from "@quiz-app/utils/jsonwebtoken";

export async function handleExtendSession(
  request: Request<unknown, unknown, Authentication>,
  response: Response
): Promise<void> {
  try {
    const { REFRESH_TOKEN_SECRET } = process.env;

    if (!REFRESH_TOKEN_SECRET) {
      throw new Error(
        "Environment variable for refresh token secret is not set"
      );
    }

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

    const decoded = verify(refreshToken, REFRESH_TOKEN_SECRET) as TokenPayload;

    const accessToken = createAccessToken(decoded.email, decoded.id);

    response.status(200).json({
      data: {
        accessToken,
      },
      message: "New access token created successfully",
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      response.status(401).json({
        data: null,
        message: "Invalid refresh token",
        status: 401,
      });

      return;
    }

    if (error instanceof Error && error.name === "TokenExpiredError") {
      response.status(401).json({
        data: null,
        message: "Refresh token has expired",
        status: 401,
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
