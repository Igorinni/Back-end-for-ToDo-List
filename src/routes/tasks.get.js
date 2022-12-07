const express = require("express");
const router = express.Router();
const db = require("../../models/index");

router.get("/tasks", async (req, res) => {
  try {
    const resObj = await db.Tasks.findAndCountAll({
      where: req.query.filterBy && {
        done: req.query.filterBy === "done" ? true : false,
      },
      order: req.query.order ? [["createdAt", req.query.order]] : null,
      limit: req.query.pp,
      offset: req.query.pp * req.query.page - req.query.pp,
    });

    res.status(200).json(resObj);
  } catch (error) {
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
