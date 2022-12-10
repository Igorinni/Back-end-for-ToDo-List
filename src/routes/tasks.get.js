const express = require("express");
const router = express.Router();
const Tasks = require("../../models/tasks");

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
    res.status(400).json({
      success: false,
      message: "Failed to get tasks :(",
    });
  }
});

module.exports = router;
