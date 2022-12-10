const express = require("express");
const recursive = require("recursive-readdir-sync");
require("dotenv").config();
const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
const { sequelize } = require("./models/index");

const beginning = (async function () {
  try {
    await sequelize.authenticate();
    app.use(cors());
    app.use(express.json());

    recursive(`${__dirname}/src/routes`).forEach((file) =>
      app.use("/", require(file))
    );

    app.listen(PORT, () => {
      console.log(`Good! Server starting on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
})();
