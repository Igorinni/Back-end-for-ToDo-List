const express = require("express");
const router = express.Router();
const validationTask = require("../middlewares/validation.middleware.js");
const Tasks = require("../../models/tasks");
const authMiddlewares = require("../middlewares/auth.middlewares.js");
const User = require("../../models/user.js");

router.post(
  "/task",

  authMiddlewares,
  validationTask.bodyRequestTask,
  validationTask.validateRequest,

  async (req, res) => {
    try {

      const { name, done, userId } = req.body;

      const user = await User.findOne({
        where: {id: userId}
      })

      const thisName = await Tasks.findOne({
        where: { name: name, userId: userId},
      });

      if (thisName) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await Tasks.create({
        name,
        done,
        createdAt: new Date(),
        userId: user.id,
      });

      res.status(201).json("Task added successfully");
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create a task :(",
        error: error?.parent?.hint,
      });
    }
  }
);

module.exports = router;
