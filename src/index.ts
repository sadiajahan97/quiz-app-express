import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const databaseURL = process.env.DATABASE_URL!;
const port = process.env.PORT!;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cors());

mongoose
  .connect(databaseURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
