"use strict";
const { Model, Sequelize } = require("sequelize");

const db = require("./index");
const classTasks = require("./user");
const User = classTasks(db.sequelize);

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      // this.belongsTo(models.User);
    }
  }
  Task.init(
    {
      uuid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      done: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },

      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );

  Task.belongsTo(User);

 /*  Task.associate = models => {
    Task.belongsTo(models.User);
  };
 */
  return Task;
};
