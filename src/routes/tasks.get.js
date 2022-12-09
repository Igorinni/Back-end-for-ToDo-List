const express = require("express");
const router = express.Router();
const unhandledRejection = require("../utils/unhandledRejection");
const db = require("../../models/index");
const classTasks = require("../../models/tasks")
const Tasks = classTasks(db.sequelize)

router.get("/tasks", async (req, res) => {
  try {
    const resObj = await Tasks.findAndCountAll({
      where: req.query.filterBy && {
        done: req.query.filterBy === "done" ? true : false,
      },
      order: req.query.order ? [["createdAt", req.query.order]] : null,
      limit: req.query.pp || null,
      offset: req.query.pp * req.query.page - req.query.pp || null,
    });

    res.status(200).json(resObj);
  } catch (error) {
    unhandledRejection(res, error);
  }
});

module.exports = router;
