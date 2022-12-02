const express = require("express");
const router = express.Router();
const ControllerAllTasks = require("../Controllers/ControllerAllTasks");

const controller = new ControllerAllTasks();

router.get('/', controller.getTasks);
router.delete('/', controller.getTasks);

module.exports = router;