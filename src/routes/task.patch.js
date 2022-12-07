const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../../models/index");

router.patch(
  "/task/:id",

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Field is empty")
    .isLength({ max: 150 })
    .withMessage("Too many characters"),
  body("done").notEmpty().isBoolean().withMessage("Type is not boolean"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const id = req.params.id;
      const { name, done, createdAt } = req.body;
      const taskExisting = await db.Tasks.findOne({
        where: { name: name },
      });

      if (taskExisting && taskExisting.uuid !== id) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      if (
        taskExisting &&
        taskExisting.uuid === id &&
        taskExisting.done === done
      ) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await db.Tasks.update(
        { name, done, createdAt },
        {
          where: { uuid: id },
        }
      );

      res.status(200).json("Update task");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
  }
);

module.exports = router;
