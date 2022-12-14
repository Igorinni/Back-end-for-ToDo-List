const jwt = require("jsonwebtoken");

const authMiddlewares = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res
        .status(400)
        .json({ message: "Not found authorization headers" });
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return res.status(400).json({ message: "Token not found" });
    }

    jwt.verify(accessToken, process.env.KEY_SECRET);

    const payload = jwt.decode(accessToken);

    res.locals.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      message:
        " Authorization failed. Please re-login to your account. Invalid token :( ",
    });
  }
};

module.exports = authMiddlewares;
