const express = require("express");
const recursive = require("recursive-readdir-sync");
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models/index");

const beginтing = (async function () {

  try {
  
    await db.sequelize.authenticate();

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

}());