const express = require("express");
const router = express.Router();
const {
  bodyRequest,
  validateRequest,
} = require("../middlewares/validation.middleware.js");
const db = require("../../models/index");
const classTasks = require("../../models/tasks");
const Tasks = classTasks(db.sequelize);

router.patch(
  "/task/:id",

  bodyRequest,
  validateRequest,

  async (req, res) => {
    try {
      const id = req.params.id;
      const { name, done } = req.body;
      const taskExisting = await Tasks.findOne({
        where: { name: name },
      });

      if (taskExisting && taskExisting.uuid !== id) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      if (
        taskExisting &&
        taskExisting.uuid === id &&
        taskExisting.done === done
      ) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await Tasks.update(
        { name, done },
        {
          where: { uuid: id },
        }
      );

      res.status(200).json("Update task");
    } catch (error) {
      console.log(error);
      res.status(400).json({
        success: false,
        message: "Failed to update the task :(",
      });
    }
  }
);

module.exports = router;
