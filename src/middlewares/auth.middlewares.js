const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const authMiddlewares = (req, res, next) => {
  try {
    const authorizationHeared = req.headers.authorization;

    if (!authorizationHeared) {
      return res.status(400).json({ message: "Token not found" });
    }

    const accessToken = authorizationHeared.split(" ")[1];
    if (!accessToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const userValid = jwt.verify(accessToken, process.env.KEY_SECRET);
    // const decoded = jwt.decode(accessToken);

    req.body.userId = userValid.id;

    next();
  } catch (error) {
    res
      .status(400)
      .json({ message: "Authorization failed, invalid token :( " });
  }
};

module.exports = authMiddlewares;
