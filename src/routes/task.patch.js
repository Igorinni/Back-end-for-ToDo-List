const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");
const {bodyRequest, validateRequest} = require("../middlewares/validateRequest.middleware.js");
const unhandledRejection = require("../utils/unhandledRejection");

router.patch(
  "/task/:id",

  bodyRequest,
  validateRequest,

  async (req, res) => {
    try {
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
      unhandledRejection(res, error);
    }
  }
);

module.exports = router;
