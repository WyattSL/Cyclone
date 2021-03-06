// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const got = require('got');
const bot = require("./bot.js");
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

var client;
exports.setClient = function(c) {
  client = c;
}


app.get("/img/*", function(req, res) {
  console.log(req.url + " " + req.path)
  var id = req.path.split("/")[req.path.split("/").length-1];
  console.log(id);
  console.log(assets[id]);
  res.redirect(assets[id])
});

app.get("/icon/*", function(req, res) {
  var id = req.path.split("/")[2];
  var guild = client.guilds.find(g => g.id == id);
  if (guild) {
    res.redirect(guild.iconURL)
  } else {
    res.sendStatus(404);
  }
});

app.get("/stats/*", function(req, res) {
  var id = req.path.split("/")[2];
  var guild = client.guilds.find(g => g.id == id);
  if (guild) {
    var obj = {};
    obj["members"] = guild.memberCount
    obj["roles"] = guild.roles.size();
    obj["channels"] = guild.channels.size();
    obj["owner"] = guild.owner.user.tag;
    res.json(obj);
  } else {
    res.sendStatus(404);
  }
})

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
  if (client) {
    if (client.status == 0) {
      res.sendStatus(200);
    } else if (client.status == 1) { // Connecting
      res.sendStatus(201)
    } else if (client.status == 2) { // reconnecting
      res.sendStatus(202)
    } else if (client.status == 3) { // idle
      res.sendStatus(203)
    } else if (client.status == 4) { // nearly
      res.sendStatus(204);
    } else if (client.status == 5) { // disconnected
      res.sendStatus(205);
    }
  } else {
    res.status(600).end(`SERVER_NULL_CLIENT`)
  }
});

app.get("/servers", function(req, res) {
  res.json(client.guilds.array());
});

app.get("/config", function(req, res) {
  res.json(client.config);
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

app.get("/link/:id/twitch", (req, res) => {
  if (!req.params.id) {
    res.sendStatus(400);
    return;
  }
  var redir = `https://cyclone.tk/link/twitch/callback`;
  var scope = `channel:read:subscriptions+user_read+user_blocks_read+user_subscriptions+chat:read+channel_read+channel_check_subscription+channel_feed_read`;
  var url = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCHID}&redirect_uri=${redir}&response_type=code&scope=${scope}&state=${req.params.id}`
  // that's a long url
  res.redirect(url);
});

app.get("/link/twitch/callback", async (req, res) => {
  if (!req.query.state) {
    var d = `<html><head><script>
      location.href=location.href.replace("#", "?");
    </script></head></html>`
    res.end(d);
    return;
  }
  res.end(`Your account should now be linked.`)
  var id = Buffer.from(req.query.state, 'hex').toString();
  var code = req.query.code;
  var redir = `https://cyclone.tk/link/twitch/callback`;
  var url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCHID}&client_secret=${process.env.TWITCHSEC}&code=${code}&grant_type=authorization_code&redirect_uri=${redir}`;
  var req = await got.post(url, {
    throwHttpErrors: false
  });
  console.log(req.body);
  var res = JSON.parse(req.body);
  var access = res.access_token;
  var refresh = res.refresh_token;
  var q = `DELETE FROM links WHERE user=? AND service="twitch";`;
  db.run(q, id);
  var q = `INSERT INTO links ("user", "service", "token", "refresh") VALUES (@0, "twitch", @1, @2);`;
  db.run(q, id, access, refresh);
});

app.get("/*", function(req, res) {
  var file = `/views` + req.path;
  if (fs.existsSync(__dirname + file)) {
    res.sendFile(__dirname + file)
  } else {
    res.sendStatus(404);
  }
})

app.post("/*", function(req, res) {
  res.sendStatus(404);
})

setInterval(function() {
  got("https://wl-cyclone.glitch.me/uptime");
}, 240000);


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});