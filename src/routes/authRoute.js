const express = require("express");
const router = express.Router();
const {registration, login, getUsers} = require("../controllers/authControllers");

router.post("/registration", registration );

router.post("/login", login );

router.get("/users", getUsers );

module.exports = router;