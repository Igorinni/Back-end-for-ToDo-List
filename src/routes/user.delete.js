const express = require("express");
const router = express.Router();
const dbHelper = require("../../models/index");
const classTasks = require("../../models/user");
const User = classTasks(dbHelper.db.sequelize);

router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({
      where: { id: id },
    });

    if (!user) {
      return res.status(400).json("Error: user not found");
    }

    await User.destroy({
      where: {
        id: id,
      },
    });

    res.status(204).json("User delete");
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Error on delete :(",
    });
  }
});

module.exports = router;
