const express = require("express");
const router = express.Router();
const db = require("../../models/index");

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
    res.status(500).json("Error on server");
    console.log(error);
  }
});

module.exports = router;
