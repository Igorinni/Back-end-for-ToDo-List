const actionsTasks = require("../working-with-tasks/actionsTasks.js");
const shortId = require("shortid");

const createTask = async (req, res) => {
  try {
    const tasks = actionsTasks.read();
    const newTask = { uuid: shortId.generate(), ...req.body };
    const newTasks = [...tasks, newTask];
    actionsTasks.write(newTasks);
    res.status(201).json("Task added successfully");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
};

module.exports = createTask;
