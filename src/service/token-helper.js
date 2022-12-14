const jwt = require("jsonwebtoken");

const generateAccessToken = (userId, username) => {
  const payload = {
    userId,
    username,
  };

  return jwt.sign(payload, process.env.KEY_SECRET, { expiresIn: "24h" });
};

module.exports = {
  generateAccessToken
};
