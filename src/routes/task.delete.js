const express = require("express");
const router = express.Router();
const actionsTasks = require("../utils/tasks-helper.js");

router.delete(`${process.env.TASKS}/task/:id`, async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await actionsTasks.read();
    const indexTask = tasks.findIndex((item) => item.uuid === id);
    tasks.splice(indexTask, 1);
    if (indexTask === -1) return res.status(400).json("Error: task not found");
    await actionsTasks.write(tasks);
    res.status(204).json("Task delete");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
