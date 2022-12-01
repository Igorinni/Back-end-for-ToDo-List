const express = require("express");
const app = express();

const read = require("./read.js");
const write = require("./write.js");

const shortId = require("shortid");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcom to Back-end");
});

app.get(process.env.TASKS, (req, res) => {
  const tasks = read();

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

  res.json(resObj);
});

app.post(process.env.TASKS, (req, res) => {
  const tasks = read();
  const newTask = { uuid: shortId.generate(), ...req.body };
  const newTasks = [...tasks, newTask];
  write(newTasks);
  res.json("Задача успешно добавлена");
});

app.delete(`${process.env.TASKS}/:id`, (req, res) => {
  const id = req.params.id;
  const tasks = read();
  const newTasks = tasks.filter((item) => item.id != id);
  write(newTasks);
  res.json("Задача успешно удалена");
});

app.delete(process.env.TASKS, (req, res) => {
  write([]);
  res.json("Все задачи удалены");
});

app.patch(`${process.env.TASKS}/:id`, (req, res) => {
  const { name, done, createdAt } = req.body;
  const tasks = read();
  let task = tasks.find((item) => item.uuid === req.params.id);
  task.name = name;
  task.done = done;
  task.createdAt = createdAt;

  write(tasks);

  res.json(task);
});

app.listen(port, () => {
  console.log("Server started! Good");
});
