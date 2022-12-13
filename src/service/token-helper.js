const jwt = require("jsonwebtoken");


const generateAccessToken = (userId, username) => {
    const payload = {
      userId,
      username,
    };
  
    return jwt.sign(payload, process.env.KEY_SECRET, { expiresIn: "24h" });
  };

const validToken = (accessToken) => {
    try {
        const validToken = jwt.verify(accessToken, process.env.KEY_SECRET);
        return validToken;
    } catch (error) {
        return null
    }
}


module.exports = {
    generateAccessToken,
    validToken
}