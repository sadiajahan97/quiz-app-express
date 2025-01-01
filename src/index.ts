import cors from "cors";
import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 3500;
const URI =
  "mongodb+srv://sadiaiffatjahan:KcmXIJsb9mSS0RBl@quiz-app-cluster.nopa2.mongodb.net/?retryWrites=true&w=majority&appName=quiz-app-cluster";

app.use(cors());

mongoose
  .connect(URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
