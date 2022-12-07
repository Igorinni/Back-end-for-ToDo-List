const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const db = require("../../models/index");

router.post(
  "/task",

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field is empty")
    .isLength({ max: 150 })
    .withMessage("Too many characters"),
  body("done").notEmpty().isBoolean().withMessage("Type is not boolean"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, done, createdAt } = req.body;

      const thisName = await db.Tasks.findOne({
        where: { name },
      });

      if (thisName) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await db.Tasks.create({
        name,
        done,
        createdAt,
      });

      res.status(201).json("Task added successfully");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }
);

module.exports = router;
