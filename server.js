// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

const assets = require("/app/stuff/assets.json")


app.get("/img/*", function(req, res) {
  console.log(req.url + " " + req.path)
  var id = req.path.split("/")[req.path.split("/").length-1];
  console.log(id);
  console.log(assets[id]);
  res.redirect(assets[id])
});

app.get("/invite", function(req, res) {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=696225400191320081&permissions=19934279&scope=bot`);
});

app.get("/uptime", function(req, res) {
  res.sendStatus(200);
});

app.get("/*", function(req, res) {
  res.sendStatus(404);
})

app.post("/*", function(req, res) {
  res.sendStatus(404);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});