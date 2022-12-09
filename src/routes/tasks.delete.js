const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");
const unhandledRejection = require("../utils/unhandledRejection")

router.delete("/tasks", async (req, res) => {
  try {
    const arrayTasks = await tasksHelper.read();
    arrayTasks.length === 0 &&
      res.status(422).json("Error: All tasks have already been deleted ");
    await tasksHelper.write([]);
    res.status(204).json("All tasks are deleted");
  } catch (error) {
    unhandledRejection(res, error);
  }
});

module.exports = router;
