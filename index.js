const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3003;

const slashTasks = require('./routes/tasks.js');
const slashTask = require('./routes/task.js');


app.use(express.json());

app.use( (req, res, next) => {

  if (req.method === 'POST' || req.method === 'PATCH') {
    if (
      req.body.name === undefined ||
      req.body.name.trim() === '' ||
      req.body.done === undefined ||
      req.body.createdAt === undefined
    ) {
      return res.status(422).json("Error 422");
    }
    next();
  }

  next();
})

app.use('/test', slashTask);
app.use('/tests', slashTasks);



app.listen(port, () => {
  console.log("Server started! Good");
});
