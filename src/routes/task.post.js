const express = require("express");
const router = express.Router();
const validationTask = require("../middlewares/validation.middleware.js");
const authMiddlewares = require("../middlewares/auth.middlewares.js");

const db = require("../../models/index");
const classTasks = require("../../models/tasks");
const Tasks = classTasks(db.sequelize);

router.post(
  "/task",

  authMiddlewares,
  validationTask.bodyRequestTask,
  validationTask.validateRequest,

  async (req, res) => {
    try {
      const userId = res.locals.user.userId;
      const { name, done } = req.body;

      const thisName = await Tasks.findOne({
        where: { name: name, userId: userId },
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
        userId: userId,
      });

      res.status(201).json("Task added successfully");
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to create a task :(",
      });
    }
  }
);

module.exports = router;
