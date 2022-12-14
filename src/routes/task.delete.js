const express = require("express");
const router = express.Router();
const Tasks = require("../../models/tasks");
const authMiddlewares = require("../middlewares/auth.middlewares.js");

router.delete("/task/:id", authMiddlewares, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = res.locals.user.userId;

    const thisTask = await Tasks.findOne({
      where: { uuid: taskId, userId: userId },
    });

    if (!thisTask) {
      return res.status(400).json("Error: task not found");
    }

    await Tasks.destroy({
      where: {
        uuid: taskId,
        userId: userId,
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
