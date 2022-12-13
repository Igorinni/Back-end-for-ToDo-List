const { body, validationResult } = require("express-validator");

const bodyRequestTask = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field is empty")
    .isLength({ max: 150 })
    .withMessage("Long name, maximum 150 characters"),
  body("done").notEmpty().isBoolean().withMessage("Type is not boolean"),
];

const bodyRequestAuth = [
  body("username")
    .isString()
    .withMessage("Type 'username' is not string")
    .trim()
    .notEmpty()
    .withMessage("The name cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Long name, max 50 characters"),
  body("password")
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isString()
    .withMessage("Type 'password' is not string")
    .isLength({ min: 3, max: 50 })
    .withMessage("Characters in the password: min 3, max 50"),
];

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = { bodyRequestTask, bodyRequestAuth, validateRequest };
