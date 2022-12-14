const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const tokenHelper = require("../service/token-helper");
const validationAuth = require("../middlewares/validation.middleware.js");

router.post(
  "/login",

  validationAuth.bodyRequestAuth,
  validationAuth.validateRequest,

  async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = tokenHelper.generateAccessToken(user.id, user.username);

      res.status(200).json({ token, username: user.username, userId: user.id });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Login error :(",
      });
    }
  }
);

module.exports = router;
