const express = require("express");
const router = express.Router();
const { bodyRequest, validateRequest } = require("../middlewares/validateRequest.middleware.js");
const unhandledRejection = require("../utils/unhandledRejection");
const db = require("../../models/index");

router.post(
  "/task",
  
  bodyRequest,
  validateRequest,
 
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, done, createdAt } = req.body;

      const thisName = await db.Tasks.findOne({
        where: { name },
      });

      if (thisName) {
        return res
          .status(422)
          .json({ message: "Error: this task already exists" });
      }

      await db.Tasks.create({
        name,
        done,
        createdAt,
      });

      res.status(201).json("Task added successfully");
    } catch (error) {
      unhandledRejection(res, error);
    }
  }
);

module.exports = router;
