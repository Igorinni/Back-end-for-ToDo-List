const express = require("express");
const router = express.Router();
const {
  bodyRequest,
  validateRequest,
} = require("../middlewares/validation.middleware.js");
const unhandledRejection = require("../utils/unhandledRejection");
const db = require("../../models/index");
const classTasks = require("../../models/tasks");
const Tasks = classTasks(db.sequelize);

router.post(
  "/task",

  bodyRequest,
  validateRequest,

  async (req, res) => {
    try {
      const { name, done, createdAt } = req.body;

      const thisName = await Tasks.findOne({
        where: { name },
      });

      if (thisName) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await Tasks.create({
        name,
        done,
        createdAt,
      });

      res.status(201).json("Task added successfully");
    } catch (error) {
      unhandledRejection(res, error);
    }
  }
);

module.exports = router;
