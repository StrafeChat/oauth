module.exports = {
  ...require("./src/index.js")
};

const { express: middleware } = require("./src/index.js").middleware;
const { mysql: Database } = require("./src/index.js").interface;
const { OAuth } = require("./src/index.js");

const express = require("express");
const session = require("express-session");
const app = express();

const port = 3000;

app.use(session({
  secret: "oauth",
  resave: false,
  saveUninitialized: false
}));
app.use(express.json());
app.use(express.urlencoded());

const mysql = new Database({
  host: "localhost",
  user: "root",
  password: "",
  database: "strafe"
}, {
  appTable: "apps"
});

const core = new OAuth(mysql);
core.createApp("test", "this is a test app").then(console.log);
app.use("/", middleware(core));

app.all("/token", (req, res) => {
  if (!req.oauth.success) {
    return res.send({ error: "an error occured" });
  }
  res.send({ success: "success", body: req.auth.authData });
});
app.get("/auth", (req, res) => {
  if (!req.oauth.success) {
    return res.send({ error: "an error occured: " + req.oauth.error });
  }
  res.send({ ...req.oauth.data });
})

app.get("/", (_req, res) => res.send("hi world"))

app.listen(port, () => console.log("ready"))
