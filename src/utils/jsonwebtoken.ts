import { sign } from "jsonwebtoken";

import { TokenPayload } from "@quiz-app/types/jsonwebtoken";

export function createAccessToken(email: string, id: string): string {
  try {
    const { ACCESS_TOKEN_SECRET } = process.env;

    if (!ACCESS_TOKEN_SECRET) {
      throw new Error(
        "Environment variable for access token secret is not set"
      );
    }

    const tokenPayload: TokenPayload = { email, id };

    const accessToken = sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    return accessToken;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating access token:", error.message);
    }

    return "";
  }
}

export function createRefreshToken(email: string, id: string): string {
  try {
    const { REFRESH_TOKEN_SECRET } = process.env;

    if (!REFRESH_TOKEN_SECRET) {
      throw new Error(
        "Environment variable for refresh token secret is not set"
      );
    }

    const tokenPayload: TokenPayload = { email, id };

    const refreshToken = sign(tokenPayload, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return refreshToken;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating refresh token:", error.message);
    }

    return "";
  }
}
