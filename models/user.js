"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Task);
    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
