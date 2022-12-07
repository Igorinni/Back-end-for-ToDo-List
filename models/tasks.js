"use strict";
const Sequelize = require("sequelize");
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Tasks extends Model {
    static associate(models) {}
  }
  Tasks.init(
    {
      uuid: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      done: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    },
    {
      sequelize,
      modelName: "Tasks",
    }
  );

  return Tasks;
};
