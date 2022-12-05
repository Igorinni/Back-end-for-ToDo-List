const express = require("express");
require("dotenv").config();
const config = require("config");
const errorMiddleware = require("./src/middlewares/errors.middleware.js");
const recursive = require("recursive-readdir-sync");

const PORT = config.get("port") || 3001;
const app = express();

app.use(express.json());

// app.use(errorMiddleware);

recursive(`${__dirname}/src/routes`).forEach((file) =>
  app.use("/", require(file))
);

app.listen(PORT, () => {
  console.log(`Good! Server starting on port ${PORT}...`);
});
