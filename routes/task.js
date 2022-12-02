const express = require("express");
const router = express.Router();
const ControllerTask = require("../Controllers/ControllerTask.js");

const controller = new ControllerTask();

router.post('/', controller.createTask);
router.delete('/:id', controller.deleteTask);
router.patch('/:id', controller.updateTask);

module.exports = router;
