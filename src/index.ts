import "module-alias/register";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import { connect } from "mongoose";

import { corsOptions } from "./config/cors";
import { COOKIE_PARSER_SECRET, DATABASE_URL } from "./config/environment";
import { protectedRouter } from "./protected-routes";
import { router } from "./routes";

const app = express();

app.use(
  cors(corsOptions),
  urlencoded({ extended: true }),
  cookieParser(COOKIE_PARSER_SECRET),
  json()
);

connect(DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);

    process.exit(1);
  });

app.use(protectedRouter);

app.use(router);

app.listen(3500, () => {
  console.log("Server running on port 3500");
});
