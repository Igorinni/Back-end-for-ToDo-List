const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const tokenHelper = require("../service/token-helper");
const validationAuth = require("../middlewares/validation.middleware.js");

router.post(
  "/registration",

  validationAuth.bodyRequestAuth,
  validationAuth.validateRequest,

  async (req, res) => {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ where: { username } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user with this name already exists" });
      }

      const hashPasswor = bcrypt.hashSync(password, 6);
      const newUser = await User.create({
        username,
        password: hashPasswor,
      });

      const token = tokenHelper.generateAccessToken(
        newUser.id,
        newUser.username
      );

      res.status(201).json({ token, username: newUser.username, userId: newUser.id });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Registration error :(",
      });
    }
  }
);

module.exports = router;
