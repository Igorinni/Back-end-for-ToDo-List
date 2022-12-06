const express = require("express");
const config = require("config");
const recursive = require("recursive-readdir-sync");



const { Sequelize } = require('sequelize');
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
/* const sequelize = new Sequelize("node_postgres", "root", "123456", {
  dialect: "mysql",
  host: "localhost"
}); */

const PORT = config.get("port") || 3001;
const app = express();

app.use(express.json());

recursive(`${__dirname}/src/routes`).forEach((file) =>
  app.use("/", require(file))
);

app.listen(PORT, () => {
  console.log(`Good! Server starting on port ${PORT}...`);
});
