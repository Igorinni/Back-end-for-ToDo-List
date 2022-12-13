const Sequelize = require("sequelize");
const options = require("../config/config.js");

const sequelize = new Sequelize(
  options.default.database,
  options.default.username,
  options.default.password,
  {
    host: options.default.host,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

module.exports = { sequelize };
