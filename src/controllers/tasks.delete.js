const actionsTasks = require("../working-with-tasks/actionsTasks.js");

const deleteAllTasks = async (req, res) => {
  try {
    actionsTasks.read().length === 0 && res.status(422).json("Error: All tasks have already been deleted ");
    actionsTasks.write([]);
    res.status(204).json("All tasks are deleted");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
};

module.exports = deleteAllTasks;
