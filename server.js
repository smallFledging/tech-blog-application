const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

const PORT = 3001;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.htm"));
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});