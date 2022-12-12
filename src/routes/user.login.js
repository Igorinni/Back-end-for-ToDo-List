const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id, username) => {
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

    const token = generateAccessToken(user.id, user.username);
    res.json({ token: `Bearer ${token}` });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Login error :(",
    });
  }
});

module.exports = router;
