const express = require("express");
const router = express.Router();
const db = require("../../models/index");

router.delete("/tasks", async (req, res) => {
  try {
    const tasks = await db.Tasks.findAll();

    if (tasks.length === 0) {
      return res
        .status(422)
        .json("Error: All tasks have already been deleted ");
    }

    await db.Tasks.destroy({
      truncate: true,
    });

    res.status(204).json("All tasks are deleted");
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
