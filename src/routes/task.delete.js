const express = require("express");
const router = express.Router();
const unhandledRejection = require("../utils/unhandledRejection");
const db = require("../../models/index");
const classTasks = require("../../models/tasks")
const Tasks = classTasks(db.sequelize)

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
    unhandledRejection(res, error);
  }
});

module.exports = router;
