const express = require("express");
require("dotenv").config();
const tasksRoutes = require("./src/routes/tasks.routes");
const config = require("config");
const errorMiddleware = require("./src/middlewares/errors.middleware.js");

const PORT = config.get("port") || 3001;
const app = express();

app.use(express.json());

app.use(errorMiddleware);

app.use(process.env.TASKS, tasksRoutes);

app.listen(PORT, () => {
  console.log(`Good! Server starting on port ${PORT}...`);
});
