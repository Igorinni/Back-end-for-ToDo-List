const express = require("express");
const router = express.Router();
const Tasks = require("../../models/tasks");

router.delete("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const thisTask = await Tasks.findOne({
      where: { uuid: id },
    });

    if (!thisTask) {
      return res.status(400).json("Error: task not found");
    }

    await Tasks.destroy({
      where: {
        uuid: id,
      },
    });

    res.status(204).json("Task delete");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Failed to delete the task :(",
    });
  }
});

module.exports = router;
