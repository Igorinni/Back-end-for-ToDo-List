const express = require("express");
const router = express.Router();
const { bodyRequest, validateRequest } = require("../middlewares/validation.middleware.js");
const unhandledRejection = require("../utils/unhandledRejection");
const db = require("../../models/index");
const classTasks = require("../../models/tasks")
const Tasks = classTasks(db.sequelize)

router.patch(
  "/task/:id",

  bodyRequest,
  validateRequest,

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = req.params.id;
      const { name, done, createdAt } = req.body;
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
        { name, done, createdAt },
        {
          where: { uuid: id },
        }
      );

      res.status(200).json("Update task");
    } catch (error) {
      unhandledRejection(res, error);
    }
  }
);

module.exports = router;
