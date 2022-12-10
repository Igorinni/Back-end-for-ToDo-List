const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, username) => {
  const payload = {
    id,
    username,
  };

  return jwt.sign(payload, process.env.KEY_SECRET, { expiresIn: "24h" });
};

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid login" });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user.userId, user.username);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Login error :(",
    });
  }
});

module.exports = router;
