const { interface } = require("./src/index.js");

const mysql = new (interface.mysql)({
  host: "localhost",
  user: "root",
  password: "",
  database: "strafe"
}, {
  appTable: "apps"
});
