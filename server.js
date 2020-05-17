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

const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
db.serialize();

const assets = require("/app/stuff/assets.json")


app.get("/img/*", function(req, res) {
  console.log(req.url + " " + req.path)
  var id = req.path.split("/")[req.path.split("/").length-1];
  console.log(id);
  console.log(assets[id]);
  res.redirect(assets[id])
});

app.get("/support", function(req, res) {
  res.redirect("https://discord.gg/nqDKcYC")
});

app.get("/invite", function(req, res) {
  res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=696225400191320081&permissions=19934279&scope=bot`);
});

app.get("/select", function(req, res) {
  res.sendFile(__dirname + "/views/select.html")
});

app.get("/uptime", function(req, res) {
  res.sendStatus(200);
});

app.get("/dashboard/*/*", function(req, res) {
  var id = req.path.split("/")[2];
  var hash = req.path.split("/")[3];
  var q = `SELECT * FROM weblinks WHERE id=?`;
  db.all(q, id, function(err, res) {
    if (err) throw err;
    if (res[0] && res[0].guild.length > 5 && res[0].hash.length > 7) {
      res.sendFile(__dirname + `/views/dashboard.html`);
    } else {
      res.sendStatus(403);
    }
  });
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