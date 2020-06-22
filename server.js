// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const bot = require("./bot.js")
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  const dbFile = "./.data/sqlite.db";
  const exists = fs.existsSync(dbFile);
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database(dbFile);
  db.serialize();

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

app.get("/profile", function(req, res) {
  res.sendFile(`${__dirname}/views/profile.html`)
});

app.get("/privacy", function(req, res) {
  res.sendFile(`${__dirname}/views/privacy.html`)
});

app.post("/updateProfile", function(req, res) {
  var id = req.body.id;
  if (!id) { 
    res.sendStatus(400);
    return;
  }
  var q = `DELETE FROM profiles WHERE user=?`; // remove any existing profiles
  db.run(q, id);
  var bday = req.body.birthday || "";
  var mc = req.body.minecraft || "";
  var epic = req.body.epic || "";
  var q = `INSERT INTO profiles ("user", "birthday", "minecraft", "epic") VALUES (@0, @1, @2, @3)`;
  db.run(q, id, bday, mc, epic);
  res.redirect("/profile/#Your profile has been updated.");
});

app.get("/oauth/redirect", (req, res) => {
  var url = `https://discord.com/api/oauth2/authorize?client_id=696225400191320081&redirect_uri=https://cyclone.tk/oauth/callback&response_type=token&scope=identify%20connections`
  res.set("Location", url).sendStatus(308);
});

app.get("/oauth/callback", (req, res) => {
  var code = req.query.code;
  
});

app.get("/*", function(req, res) {
  var file = req.path;
  if (fs.existsSync(__dirname + file)) {
    res.sendFile(__dirname + file)
  } else {
    res.sendStatus(404);
  }
})

app.post("/*", function(req, res) {
  res.sendStatus(404);
})


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});