const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(__dirname);

const e = {};

for (const file of files) {
  if (!file.endsWith(".js") || file === "index.js") continue;
  const name = file.slice(0, file.lastIndexOf(".js"));
  e[name] = require(path.join(__dirname, file));
}

module.exports = e;
