const { sequelize } = require("./index");
const { Model, DataTypes, Sequelize } = require("sequelize");
const User = require("./user");
class Tasks extends Model {
  static associate(models) {
    this.belongsTo(models.User);
  }
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

    userId: {
      type:  DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: "Tasks",
  }
);
//Tasks.belongsTo(User, {foreignKey: "userId"});
module.exports = Tasks;
