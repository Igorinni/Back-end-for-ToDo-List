const express = require("express");
const router = express.Router();
const funcCont = require('../Controllers/ControllersTasks');
// const controller = require('../Controllers/ControllerTasks.js');

const controller = new funcCont();

router.get(process.env.TASKS, controller.getTasks);
router.delete(process.env.TASKS, controller.getTasks);

/* 
router.get(process.env.TASKS, (req, res) => {
    try {
      const tasks = read();
  
      if (req.query.order === "asc")
        tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      if (req.query.order === "desc")
        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      let responseTasks = [...tasks];
  
      if (req.query.filterBy) {
        const filterBy = req.query.filterBy === "done" ? true : false;
        responseTasks = responseTasks.filter((item) => item.done === filterBy);
      }
  
      let displayTasks = [...responseTasks];
  
      if (req.query.page) {
        const lastTask = req.query.pp * req.query.page;
        const firstTask = lastTask - req.query.pp;
        displayTasks = responseTasks.slice(firstTask, lastTask);
      }
  
      const resObj = {
        count: displayTasks.length,
        tasks: displayTasks,
      };
  
      res.status(200).json(resObj);
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
});

router.delete('/', (req, res) => {
    try {
      write([]);
      res.status(204).json("All tasks are deleted");
    } catch (error) {
      res.status(500).json("Error on server");
      console.log(error);
    }
});
 */
module.exports = router;