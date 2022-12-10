const User = require("../../models/user");

const registration = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Ошибочка вышла №1 :(",
    });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Ошибочка вышла №2 :(",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    res.status(200).json("server work");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Ошибочка вышла №3 :(",
    });
  }
};

module.exports = { registration, login, getUsers };
