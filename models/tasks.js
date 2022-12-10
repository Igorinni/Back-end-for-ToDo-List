const { sequelize } = require("./index");
const { Model, DataTypes, Sequelize } = require("sequelize");

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
  },
  {
    sequelize,
    modelName: "Tasks",
  }
);

module.exports = Tasks;
