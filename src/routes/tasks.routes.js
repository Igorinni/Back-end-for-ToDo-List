const express = require("express");
const router = express.Router();
const getTasks = require("../controllers/tasks.get");
const deleteAllTasks = require("../controllers/tasks.delete");
const createTask = require("../controllers/task.post");
const deleteTask = require("../controllers/task.delete");
const updateTask = require("../controllers/task.patch");

router.get("/", getTasks);
router.delete("/", deleteAllTasks);
router.post("/task", createTask);
router.delete("/task/:id", deleteTask);
router.patch("/task/:id", updateTask);

module.exports = router;
