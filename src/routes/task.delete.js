const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");

router.delete("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await tasksHelper.read();
    const indexTask = tasks.findIndex((item) => item.uuid === id);
    tasks.splice(indexTask, 1);
    if (indexTask === -1) return res.status(400).json("Error: task not found");
    await tasksHelper.write(tasks);
    res.status(204).json("Task delete");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
