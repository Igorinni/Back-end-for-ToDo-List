const express = require("express");
const router = express.Router();
const unhandledRejection = require("../utils/unhandledRejection");
const db = require("../../models/index");
const classTasks = require("../../models/tasks")
const Tasks = classTasks(db.sequelize)


router.delete("/tasks", async (req, res) => {
  try {
    const tasks = await Tasks.findAll();

    if (tasks.length === 0) {
      return res
        .status(422)
        .json("Error: All tasks have already been deleted ");
    }

    await Tasks.destroy({
      truncate: true,
    });

    res.status(204).json("All tasks are deleted");
  } catch (error) {
    unhandledRejection(res, error);
  }
});

module.exports = router;
