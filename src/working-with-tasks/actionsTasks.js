const fs = require("fs");

const read = () => {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/tasks.json`, { encoding: "utf8" })
  );
};

const write = (tasks) =>
  fs.writeFileSync(`${__dirname}/tasks.json`, JSON.stringify(tasks, 1, 2));

module.exports = { read, write };
