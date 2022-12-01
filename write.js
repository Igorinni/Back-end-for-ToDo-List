const fs = require("fs");

const write = (tasks) => {
  fs.writeFileSync(
    `${__dirname}/tasks.json`,
    JSON.stringify(tasks, 1, 2)
  );
};

module.exports = write;
