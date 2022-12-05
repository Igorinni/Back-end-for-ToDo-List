const actionsTasks = require("../utils/tasks-helper");

const errorMiddleware = async (req, res, next) => {
  const tasks = await actionsTasks.read();
  /* 
  if (req.method === "POST" || req.method === "PATCH") {
    const sumProperty = [];

    for (let key in req.body) {
      sumProperty.push(key);
      if (key === "name" || key === "done" || key === "createdAt") {
        continue;
      } else {
        return res.status(422).json("Error 422");
      }
    }

    const name = tasks.find((item) => item.name === req.body.name);

    if (
      sumProperty.length > 3 ||
      (name && req.method === "POST") ||
      (name && name.done === req.body.done) ||
      req.body.name === undefined ||
      req.body.name.trim() === "" ||
      req.body.done === undefined ||
      req.body.createdAt === undefined
    ) {
      return res.status(422).json("Error 422");
    }

    next();
  } */

  next();
};

module.exports = errorMiddleware;
