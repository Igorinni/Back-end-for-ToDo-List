const express = require("express");
const router = express.Router();
const Tasks = require("../../models/tasks");
const authMiddlewares = require("../middlewares/auth.middlewares.js");

router.get("/tasks", authMiddlewares, async (req, res) => {
  try {
    const userId = req.body.userId;
    const response = await Tasks.findAndCountAll({
      where: req.query.filterBy
        ? {
            userId: userId,
            done: req.query.filterBy === "done" ? true : false,
          }
        : {
            userId: userId,
          },
      order: req.query.order ? [["createdAt", req.query.order]] : null,
      limit: req.query.pp || null,
      offset: req.query.pp * req.query.page - req.query.pp || null,
    });
    
    const resObj = {
      count: response.count,
      rows: response.rows,
      username: req.body.username,
    }
    res.status(200).json(resObj);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get tasks :(",
      error: error?.parent?.hint,
    });
  }
});

module.exports = router;
