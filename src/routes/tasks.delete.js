const express = require("express");
const router = express.Router();
const tasksHelper = require("../utils/tasks-helper.js");

router.delete("/tasks", async (req, res) => {
  try {
    (await tasksHelper.read().length) === 0 &&
      res.status(422).json("Error: All tasks have already been deleted ");
    await tasksHelper.write([]);
    res.status(204).json("All tasks are deleted");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
