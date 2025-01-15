import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { Authentication } from "@quiz-app/types/authentication";
import { TokenPayload } from "@quiz-app/types/jsonwebtoken";

export function verifyAccessToken(
  request: Request<unknown, unknown, Authentication>,
  response: Response,
  next: NextFunction
): void {
  try {
    const { ACCESS_TOKEN_SECRET } = process.env;

    if (!ACCESS_TOKEN_SECRET) {
      throw new Error(
        "Environment variable for access token secret is not set"
      );
    }

    const { authorization } = request.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      response.status(401).json({
        data: null,
        message: "Access token is missing",
        status: 401,
      });

      return;
    }

    const accessToken = authorization.split(" ")[1];

    const decoded = verify(accessToken, ACCESS_TOKEN_SECRET) as TokenPayload;

    request.body.user = decoded;

    next();
  } catch (error) {
    if (error instanceof Error && error.name === "JsonWebTokenError") {
      response.status(401).json({
        data: null,
        message: "Invalid access token",
        status: 401,
      });

      return;
    }

    if (error instanceof Error && error.name === "TokenExpiredError") {
      response.status(401).json({
        data: null,
        message: "Access token has expired",
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
