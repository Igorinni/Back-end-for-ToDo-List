const read = require("../read");
const write = require("../write");
const shortId = require("shortid");

class ControllerTask {
  async createTask(req, res) {
    try {
      const tasks = read();
      const newTask = { uuid: shortId.generate(), ...req.body };
      const newTasks = [...tasks, newTask];
      write(newTasks);
      res.status(201).json("Task added successfully");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }

  async deleteTask(req, res) {
    try {
      const id = req.params.id;
      const tasks = read();
      const indexTask = tasks.findIndex((item) => item.uuid === id);
      tasks.splice(indexTask, 1);
      if (indexTask === -1) return res.status(400).json("Error: no such task");
      write(tasks);
      res.status(202).json("Task delete");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }

  async updateTask(req, res) {
    try {
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
  }
}

module.exports = ControllerTask;
