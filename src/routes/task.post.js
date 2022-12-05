const express = require("express");
const router = express.Router();
const actionsTasks = require("../utils/tasks-helper.js");
const shortId = require("shortid");
// const validationMiddleware = require("../utils/validation.middleware.js")

const validationMiddleware = () => async (req, res, next) => {
  const tasks = await actionsTasks.read();

  // for (let key in req.body) {
  //   if (
  //     (key === "name" || key === "done" || key === "createdAt") &&
  //     req.body[key] !== undefined
  //   ) {
  //     continue;
  //   } else {
  //     return res
  //       .status(422)
  //       .json({ status: 422, message: "Error: no required field" });
  //   }
  // }


  const oldTask = tasks.find((item) => item.name === req.body.name);
  if (oldTask) {
    return res
      .status(422)
      .json({ status: 422, message: "This task already exists" });
  }

  next();
};

router.post(
  `${process.env.TASKS}/task`,
  validationMiddleware(),
  async (req, res) => {
    try {
      const tasks = await actionsTasks.read();
      const newTask = {
        uuid: shortId.generate(), 
        name: req.body.name,
        done: req.body.done,
        createdAt: req.body.createdAt,
      };
      const newTasks = [...tasks, newTask];
      await actionsTasks.write(newTasks);
      res.status(201).json("Task added successfully");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }
);

module.exports = router;
