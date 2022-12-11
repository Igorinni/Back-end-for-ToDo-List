const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const authMiddlewares = require("../middlewares/auth.middlewares.js");

router.get("/users", authMiddlewares, async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error on get :(",
    });
  }
});

module.exports = router;
