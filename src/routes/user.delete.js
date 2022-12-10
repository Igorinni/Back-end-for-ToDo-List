const express = require("express");
const router = express.Router();
const User = require("../../models/user");

router.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findOne({
      where: { userId: id },
    });

    if (!user) {
      return res.status(400).json("Error: user not found");
    }

    await User.destroy({
      where: {
        userId: id,
      },
    });

    res.status(200).json("User delete");
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "Error on delete :(",
    });
  }
});

module.exports = router;
