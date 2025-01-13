import { sign } from "jsonwebtoken";

import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "@quiz-app/config/environment";
import { TokenPayload } from "@quiz-app/types/jsonwebtoken";

export function createAccessToken(email: string, id: string): string {
  try {
    const tokenPayload: TokenPayload = { email, id };

    const accessToken = sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    return accessToken;
  } catch (error) {
    console.error("Error creating access token:", error);

    throw new Error(
      "Access token creation failed due to invalid payload or configuration"
    );
  }
}

export function createRefreshToken(email: string, id: string): string {
  try {
    const tokenPayload: TokenPayload = { email, id };

    const refreshToken = sign(tokenPayload, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return refreshToken;
  } catch (error) {
    console.error("Error creating refresh token:", error);

    throw new Error(
      "Refresh token creation failed due to invalid payload or configuration"
    );
  }
}
