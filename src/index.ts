import "module-alias/register";
import cors from "cors";
import { config } from "dotenv";
import express, { json, urlencoded } from "express";
import { connect } from "mongoose";

import { signInRouter } from "./routes/sign-in";
import { signUpRouter } from "./routes/sign-up";

config();

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());

connect(process.env.DATABASE_URL!)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.use("/sign-in", signInRouter);
app.use("/sign-up", signUpRouter);

app.listen(process.env.PORT!, () => {
  console.log(`Server running on port ${process.env.PORT!}`);
});
