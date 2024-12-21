const express = require("express");
const path = require("path");
const app = express();
const PORT = 3500;

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
