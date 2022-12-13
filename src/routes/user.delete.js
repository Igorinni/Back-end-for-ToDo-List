const express = require("express");
const router = express.Router();
const User = require("../../models/user");

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
      error: error?.parent?.hint,
    });
  }
});

module.exports = router;
