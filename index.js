const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000;

const slashTasks = require("./routes/tasks.js");
const slashTask = require("./routes/task.js");
const read = require("./read");
app.use(express.json());

const tasks = read();

app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PATCH") {
    const name = tasks.find((item) => item.name === req.body.name);

    if (
      (name && req.method === "POST") ||
      (name && name.done === req.body.done) ||
      req.body.name === undefined ||
      req.body.name.trim() === "" ||
      req.body.done === undefined ||
      req.body.createdAt === undefined
    ) {
      return res.status(422).json("Error 422");
    }

    next();
  }

  next();
});

app.use("/tasks", slashTasks);
app.use("/task", slashTask);

app.listen(port, () => {
  console.log("Server started! Good");
});
