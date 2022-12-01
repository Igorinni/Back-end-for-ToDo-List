const express = require("express");
const app = express();

const read = require("./read.js");
const write = require("./write.js");

const shortId = require("shortid");
require("dotenv").config();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcom to Back-end");
});

app.get(process.env.TASKS, (req, res) => {
  try {
    const tasks = read();

    /* if (req.query.order) {
      tasks.sort((a, b) =>
        req.query.order === "asc"
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt)
      );
    } */

    if (req.query.order === "asc")
      tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (req.query.order === "desc")
      tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let responseTasks = [...tasks];

    if (req.query.filterBy) {
      const filterBy = req.query.filterBy === "done" ? true : false;
      responseTasks = responseTasks.filter((item) => item.done === filterBy);
    }

    let displayTasks = [...responseTasks];

    if (req.query.page) {
      const lastTask = req.query.pp * req.query.page;
      const firstTask = lastTask - req.query.pp;
      displayTasks = responseTasks.slice(firstTask, lastTask);
    }

    const resObj = {
      count: displayTasks.length,
      tasks: displayTasks,
    };

    res.status(200).json(resObj);
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

app.post(process.env.TASKS, (req, res) => {
  try {
    const tasks = read();
    if (
      !req.body.name ||
      req.body.name.trim() === "" ||
      !req.body.done ||
      !req.body.createdAt
    ) {
      return res.status(422).json("Error 422");
    }
    const newTask = { uuid: shortId.generate(), ...req.body };
    const newTasks = [...tasks, newTask];
    write(newTasks);
    res.status(201).json("Task added successfully");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

app.delete(`${process.env.TASKS}/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const tasks = read();
    const newTasks = tasks.filter((item) => item.id != id);
    write(newTasks);
    res.status(204).json("Task deleted successfully");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

app.delete(process.env.TASKS, (req, res) => {
  try {
    write([]);
    res.status(204).json("All tasks are deleted");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

app.patch(`${process.env.TASKS}/:id`, (req, res) => {
  try {
    if (
      !req.body.name ||
      req.body.name.trim() === "" ||
      !req.body.done ||
      !req.body.createdAt
    ) {
      return res.status(422).json("Error 422");
    }
    const { name, done, createdAt } = req.body;
    const tasks = read();
    let task = tasks.find((item) => item.uuid === req.params.id);
    task.name = name;
    task.done = done;
    task.createdAt = createdAt;

    write(tasks);

    res.status(200).json("Update task");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

app.listen(port, () => {
  console.log("Server started! Good");
});
