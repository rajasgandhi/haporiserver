var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var http = require('http');

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
  res.send("Please use /getposts or /sendpost!");
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

function startKeepAlive() {
  setInterval(function() {
      var options = {
          host: 'haporiserver.herokuapp.com',
          port: 80,
          path: '/'
      };
      http.get(options, function(res) {
          res.on('data', function(chunk) {
              try {
                  // optional logging... disable after it's working
                  console.log("HEROKU RESPONSE: " + chunk);
              } catch (err) {
                  console.log(err.message);
              }
          });
      }).on('error', function(err) {
          console.log("Error: " + err.message);
      });
  }, 20 * 60 * 1000); // load every 20 minutes
}

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));
startKeepAlive();
