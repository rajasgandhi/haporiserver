var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");

var app = express();

var PORT = process.env.PORT || 3000;

let posts = [];

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  response.send("Please use /getposts or /sendpost!");
});

app.get("/getposts", (req, res) => {
  res.send(posts);
  res.end();
});

app.post("/sendpost",  (req, res) => {
  posts.unshift(req.body);
  console.log(posts);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
