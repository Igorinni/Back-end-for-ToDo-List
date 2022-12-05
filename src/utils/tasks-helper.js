/* const fs = require("fs");

const read = () => {
  console.log(JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`, { encoding: "utf8" })))
  return JSON.parse(fs.readFileSync(`${__dirname}/tasks.json`, { encoding: "utf8" }));
}
const write = (tasks) =>
  fs.writeFileSync(`${__dirname}/tasks.json`, JSON.stringify(tasks, 1, 2));

module.exports = { read, write };

 */

const fs = require("fs").promises;

const read = async () => {
  const tasks = await fs.readFile(`${__dirname}/tasks.json`, {
    encoding: "utf8",
  });
  return JSON.parse(tasks);
};

const write = async (tasks) => {
  const request = await fs.writeFile(
    `${__dirname}/tasks.json`,
    JSON.stringify(tasks, 1, 2)
  );
  return request;
};

module.exports = { read, write };
