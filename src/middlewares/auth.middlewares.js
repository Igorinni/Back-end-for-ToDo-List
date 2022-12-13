const tokenHelper = require("../service/token-helper");

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
      // throw new Error({ status: 400, message: "Token not found" });
      return res
        .status(400)
        .json({ message: "Token not found" });
    }

    const validToken = tokenHelper.validToken(accessToken);
    // const token = jwt.verify(accessToken, process.env.KEY_SECRET);
    //const user = token.payload;
    if (!validToken) {
      return res
        .status(401)
        .json({ message: "Please re-login to your account" });
    }

    req.body.userId = validToken.userId;
    req.body.username = validToken.username;
    // res.locals.user = token.payload;
    next();
  } catch (error) {
    res
      .status(401)
      .json({
        message: "Authorization failed, invalid token :( ",
        error: error?.parent?.hint,
      });
    // .error['status']
  }
};

module.exports = authMiddlewares;
