const express = require("express");
const router = express.Router();
const actionsTasks = require("../utils/tasks-helper.js");

router.patch(`${process.env.TASKS}/task/:id`, async (req, res) => {
  try {
    const { name, done, createdAt } = req.body;
    const tasks = await actionsTasks.read();
    let task = tasks.find((item) => item.uuid === req.params.id);
    task.name = name;
    task.done = done;
    task.createdAt = createdAt;

    await actionsTasks.write(tasks);

    res.status(200).json("Update task");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
