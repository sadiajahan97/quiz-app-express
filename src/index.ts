import "module-alias/register";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import { connect } from "mongoose";

import { corsOptions } from "./config/cors";
import { COOKIE_PARSER_SECRET, DATABASE_URL } from "./config/environment";
import { editUserRouter } from "./routes/edit-user";
import { signInRouter } from "./routes/sign-in";
import { signOutRouter } from "./routes/sign-out";
import { signUpRouter } from "./routes/sign-up";

const app = express();

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(json());

connect(DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);

    process.exit(1);
  });

app.use("/account", editUserRouter);
app.use("/sign-in", signInRouter);
app.use("/sign-out", signOutRouter);
app.use("/sign-up", signUpRouter);

app.listen(3500, () => {
  console.log("Server running on port 3500");
});
