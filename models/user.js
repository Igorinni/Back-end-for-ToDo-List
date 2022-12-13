const { sequelize } = require("./index");
const { Model, DataTypes, Sequelize } = require("sequelize");
const Tasks = require("./tasks")
class User extends Model {
  static associate(models) {
    this.hasMany(models.Tasks); 
  }
}
User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
//User.hasMany(Tasks, {foreignKey: "userId"});
module.exports = User;
