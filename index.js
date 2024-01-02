module.exports = {
  ...require("./src/index.js")
};

const middleware = require("./src/index.js").middleware.express;

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

app.use("/", middleware());

app.all("/token", (req, res) => {
  if (!req.success) {
    return res.send({ error: "an error occured" });
  }
  res.send({ success: "success", body: req.authData });
})

app.get("/", (_req, res) => res.send("hi world"))

app.listen(port, () => console.log("ready"))
