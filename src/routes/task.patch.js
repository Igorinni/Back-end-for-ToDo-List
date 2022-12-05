const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");

router.patch(
  "/task/:id",

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

      if (
        tasks.find(
          (item) => item.name === req.body.name && item.done === req.body.done
        )
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
