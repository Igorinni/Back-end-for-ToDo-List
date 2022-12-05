const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");
const shortId = require("shortid");
const { body, validationResult } = require("express-validator");

router.post(
  "/task",

  body("name")
    .trim()
    .notEmpty()
    .withMessage("String is empty")
    .isString()
    .withMessage("Type is not string")
    .isLength({ max: 150 }),
  body("done").notEmpty().toBoolean().withMessage("Type is not boolean"),
  body("createdAt").notEmpty(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tasks = await tasksHelper.read();

      if (tasks.find((item) => item.name === req.body.name)) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      const newTask = {
        uuid: shortId.generate(),
        name: req.body.name,
        done: req.body.done,
        createdAt: req.body.createdAt,
      };
      const newTasks = [...tasks, newTask];
      await tasksHelper.write(newTasks);
      res.status(201).json("Task added successfully");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }
);

module.exports = router;
