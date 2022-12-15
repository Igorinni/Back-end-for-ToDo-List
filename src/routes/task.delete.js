const express = require("express");
const router = express.Router();
const authMiddlewares = require("../middlewares/auth.middlewares.js");

const db = require("../../models/index");
const classTasks = require("../../models/tasks");
const Tasks = classTasks(db.sequelize);
const classTasks2 = require("../../models/user");
const User = classTasks2(db.sequelize);

router.delete("/task/:id", authMiddlewares, async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = res.locals.user.userId;

    const findT = await User.findOne({
        include: [
          {
            association: "Tasks",
            where: {
              uuid: taskId
            },
          },
        ],
      });

    console.log("--------------------", findT)

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
