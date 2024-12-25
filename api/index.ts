const cors = require("cors");
const express = require("express");

const app = express();
const PORT = 3500;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
