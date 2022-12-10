const { sequelize } = require("./index");
const { Model, DataTypes, Sequelize } = require("sequelize");

class User extends Model {
  static associate(models) {}
}
User.init(
  {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
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
module.exports = User;
