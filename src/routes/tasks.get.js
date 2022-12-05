const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");

router.get("/tasks", async (req, res) => {
  try {
    let tasks = await tasksHelper.read();

    if (req.query.order === "asc")
      tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (req.query.order === "desc")
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (req.query.filterBy) {
      const filterBy = req.query.filterBy === "done" ? true : false;
      tasks = tasks.filter((item) => item.done === filterBy);
    }

    const count = tasks.length;

    if (req.query.page) {
      const lastTask = req.query.pp * req.query.page;
      const firstTask = lastTask - req.query.pp;
      tasks = tasks.slice(firstTask, lastTask);
    }

    const resObj = {
      count: count,
      tasks: tasks,
    };

    res.status(200).json(resObj);
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
