import cors from "cors";
import express from "express";
import serverless from "serverless-http";

const app = express();
const PORT = 3500;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi");
});

export const handler = serverless(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
