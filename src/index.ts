import "module-alias/register";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { connect } from "mongoose";

import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";

config();

const COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = 3500;

if (!COOKIE_PARSER_SECRET) {
  throw new Error("Environment variable for cookie parser secret is not set.");
}

if (!DATABASE_URL) {
  throw new Error("Environment variable for database URL is not set.");
}

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(json());

connect(DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.use("/sign-in", signInRouter);
app.use("/sign-out", signOutRouter);
app.use("/sign-up", signUpRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
