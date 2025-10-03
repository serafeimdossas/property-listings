const express = require("express");
const app = express();
require("dotenv").config();

// define api port
const PORT = process.env.BACKEND_PORT || 9000;

// parse JSON
app.use(express.json());

// test init route
app.get("/", (_req, res) => {
  res.send("Express API init!");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
