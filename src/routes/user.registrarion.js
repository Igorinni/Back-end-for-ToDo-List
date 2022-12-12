const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

router.post(
  "/registration",
  [
    check("username", "The name cannot be empty").notEmpty(),
    check("password", "The password must be more than 3 characters").isLength({
      min: 3,
      max: 30,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ "Registration error": errors.array() });
      }

      console.log(req.body)
      const { username, password } = req.body;
      const candidate = await User.findOne({ where: { username } });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "A user with this name already exists" });
      }

      const hashPasswor = bcrypt.hashSync(password, 6);
      await User.create({
        username,
        password: hashPasswor,
      });

      res.status(200).json({ message: "Registration was successful" });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Registration error :(",
      });
    }
  }
);

module.exports = router;
