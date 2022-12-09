const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");
const shortId = require("shortid");
const { bodyRequest, validateRequest } = require("../middlewares/validateRequest.middleware.js");
const unhandledRejection = require("../utils/unhandledRejection");

router.post(
  "/task",

  bodyRequest,
  validateRequest,

  async (req, res) => {
    try {
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
        createdAt: new Date(),
      };

      const newTasks = [...tasks, newTask];
      await tasksHelper.write(newTasks);
      res.status(201).json("Task added successfully");
    } catch (error) {
      unhandledRejection(res, error);
    }
  }
);

module.exports = router;
