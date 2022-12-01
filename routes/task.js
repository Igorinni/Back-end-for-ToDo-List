const express = require("express");
const router = express.Router();
const controller = require('../Controllers/Controllers.js');

const funcCont = new controller();

router.post(`${process.env.TASK}`, funcCont.createTask);
router.delete(`${process.env.TASK}/:id`, funcCont.deleteTask);
router.patch(`${process.env.TASK}/:id`, funcCont.updateTask);


module.exports = router;
