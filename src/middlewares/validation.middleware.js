const { body, validationResult } = require("express-validator");


const bodyRequest = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field is empty")
    .isLength({ max: 2 })
    .withMessage("Too many characters"),
  body("done").notEmpty().isBoolean().withMessage("Type is not boolean"),
  body("createdAt").notEmpty(),
]

const validateRequest = (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = {bodyRequest, validateRequest};