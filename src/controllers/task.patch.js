const actionsTasks = require("../working-with-tasks/actionsTasks.js");

const updateTask = async (req, res) => {
  try {
    const { name, done, createdAt } = req.body;
    const tasks = actionsTasks.read();
    let task = tasks.find((item) => item.uuid === req.params.id);
    task.name = name;
    task.done = done;
    task.createdAt = createdAt;

    actionsTasks.write(tasks);

    res.status(200).json("Update task");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
};

module.exports = updateTask;
