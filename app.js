var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();

var PORT = process.env.PORT || 3000;
var host = "";

let posts = []

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.send("Please use /getposts or /sendpost!");
});

app.get("/getposts", function (request, response) {
  response.send(posts);
  response.end();
});

app.post("/sendpost", function (request, response) {
  const post = request.body;
  console.log(post);
  posts.unshift(post);
  Array.prototype.reverse(posts);
  response.send("Posts updated!");
});

if(process.env.NODE_ENV.toLowerCase() == 'development') {
  host = "192.168.1.18";
} else {
  host = "haporiserver.herokuapp.com";
}
app.listen(PORT, host, () => console.log(`app listening on port ${PORT}!`));