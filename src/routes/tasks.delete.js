const express = require("express");
const router = express.Router();
const actionsTasks = require("../utils/tasks-helper.js");

router.delete(process.env.TASKS, async (req, res) => {
  try {
    (await actionsTasks.read().length) === 0 &&
      res.status(422).json("Error: All tasks have already been deleted ");
    await actionsTasks.write([]);
    res.status(204).json("All tasks are deleted");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
