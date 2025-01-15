import "module-alias/register";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
config();
import express, { json, urlencoded } from "express";
import { connect } from "mongoose";

import { corsOptions } from "./config/cors";
import { protectedRouter } from "./protected-routes";
import { router } from "./routes";

async function startServer(): Promise<void> {
  try {
    const { COOKIE_PARSER_SECRET, DATABASE_URL } = process.env;

    if (!COOKIE_PARSER_SECRET) {
      throw new Error(
        "Environment variable for cookie parser secret is not set"
      );
    }

    if (!DATABASE_URL) {
      throw new Error("Environment variable for database URL is not set");
    }

    const app = express();

    app.use(
      cors(corsOptions),
      urlencoded({ extended: true }),
      cookieParser(COOKIE_PARSER_SECRET),
      json()
    );

    await connect(DATABASE_URL);

    app.use(router);

    app.use(protectedRouter);

    app.listen(3500, () => {
      console.log("Server running on port 3500");
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error starting server:", error.message);
    }
  }
}

startServer();
