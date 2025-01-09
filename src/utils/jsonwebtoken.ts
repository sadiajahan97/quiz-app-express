import { sign } from "jsonwebtoken";

import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "@quiz-app/config/environment";
import { TokenPayload } from "@quiz-app/types/jsonwebtoken";

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function createTokens(email: string, id: string): Tokens {
  try {
    const tokenPayload: TokenPayload = { email, id };

    const accessToken = sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = sign(tokenPayload, REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error creating tokens:", error);

    throw new Error(
      "Token creation failed due to invalid payload or configuration."
    );
  }
}
