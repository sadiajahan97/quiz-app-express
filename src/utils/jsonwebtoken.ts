import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();

interface TokenPayload {
  email: string;
  id: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export function createTokens(email: string, id: string): Tokens {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("Environment variables for token secrets are not set.");
  }

  try {
    const tokenPayload: TokenPayload = { email, id };

    const accessToken = jsonwebtoken.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jsonwebtoken.sign(tokenPayload, REFRESH_TOKEN_SECRET, {
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
