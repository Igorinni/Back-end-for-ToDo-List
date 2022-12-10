const Sequelize = require("sequelize");
const { development, production } = require("../config/config.js");
const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "development") {
  sequelize = new Sequelize(
    development.database,
    development.username,
    development.password,
    {
      host: development.host,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  );
}

if (NODE_ENV === "production") {
  sequelize = new Sequelize(
    production.database,
    production.username,
    production.password,
    {
      host: production.host,
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }
  );
}

module.exports = { sequelize };
