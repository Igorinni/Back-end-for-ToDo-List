const actionsTasks = require("../working-with-tasks/actionsTasks.js");

const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = actionsTasks.read();
    const indexTask = tasks.findIndex((item) => item.uuid === id);
    tasks.splice(indexTask, 1);
    if (indexTask === -1) return res.status(400).json("Error: task not found");
    actionsTasks.write(tasks);
    res.status(204).json("Task delete");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
};

module.exports = deleteTask;
