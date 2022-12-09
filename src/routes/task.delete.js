const express = require("express");
const router = express.Router();
const db = require("../../models/index");
const unhandledRejection = require("../utils/unhandledRejection");

router.delete("/task/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const thisTask = await db.Tasks.findOne({
      where: { uuid: id },
    });

    if (!thisTask) {
      return res.status(400).json("Error: task not found");
    }

    await db.Tasks.destroy({
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
