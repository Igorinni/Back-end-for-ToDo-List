const express = require("express");
const router = express.Router();
const ControllerAllTasks = require("../Controllers/ControllerAllTasks");

const controller = new ControllerAllTasks();

router.get(process.env.TASKS, controller.getTasks);
router.delete(process.env.TASKS, controller.getTasks);

module.exports = router;