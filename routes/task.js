const express = require("express");
const router = express.Router();
const ControllerTask = require("../Controllers/ControllerTask.js");

const controller = new ControllerTask();

router.post(`${process.env.TASK}`, controller.createTask);
router.delete(`${process.env.TASK}/:id`, controller.deleteTask);
router.patch(`${process.env.TASK}/:id`, controller.updateTask);

module.exports = router;
