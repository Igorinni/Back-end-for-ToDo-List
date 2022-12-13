const express = require("express");
const router = express.Router();
const validationTask = require("../middlewares/validation.middleware.js");
const Tasks = require("../../models/tasks");
const authMiddlewares = require("../middlewares/auth.middlewares.js");

router.patch(
  "/task/:id",

  authMiddlewares,
  validationTask.bodyRequestTask,
  validationTask.validateRequest,

  async (req, res) => {
    try {
      const userId = req.body.userId;
      const id = req.params.id;
      const { name, done } = req.body;
      const taskExisting = await Tasks.findOne({
        where: { name: name, userId: userId },
      });

      if (taskExisting && taskExisting.uuid !== id) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      if (
        taskExisting &&
        taskExisting.uuid === id &&
        taskExisting.done === done
      ) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await Tasks.update(
        { name, done },
        {
          where: { uuid: id, userId: userId },
        }
      );

      res.status(201).json("Update task");
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to update the task :(",
        error: error?.parent?.hint,
      });
    }
  }
);

module.exports = router;
