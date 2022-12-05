const express = require("express");
const router = express.Router();
const actionsTasks = require("../utils/tasks-helper.js");
const shortId = require("shortid");

router.post(`${process.env.TASKS}/task`, async (req, res) => {
  try {
    const tasks = await actionsTasks.read();
    const newTask = { uuid: shortId.generate(), ...req.body };
    const newTasks = [...tasks, newTask];
    await actionsTasks.write(newTasks);
    res.status(201).json("Task added successfully");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
