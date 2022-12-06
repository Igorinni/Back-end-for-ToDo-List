const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");
const { body, validationResult } = require("express-validator");

router.patch(
  "/task/:id",

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field is empty")
    .isLength({ max: 150 })
    .withMessage("Too many characters"),
  body("done").notEmpty().isBoolean().withMessage("Type is not boolean"),
  body("createdAt").notEmpty(),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const tasks = await tasksHelper.read();
      const taskExisting = tasks.find((item) => item.name === req.body.name);

      if (taskExisting && taskExisting.uuid !== req.params.id) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      if (
        taskExisting &&
        taskExisting.uuid === req.params.id &&
        taskExisting.done === req.body.done
      ) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      const { name, done, createdAt } = req.body;
      let task = tasks.find((item) => item.uuid === req.params.id);
      task.name = name;
      task.done = done;
      task.createdAt = createdAt;

      await tasksHelper.write(tasks);

      res.status(200).json("Update task");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }
);

module.exports = router;
