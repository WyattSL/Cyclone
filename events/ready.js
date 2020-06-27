const DBL = require("dblapi.js");

exports.run = function(client, args) {
  const fs = require("fs");
  const got = require("got");
  console.log("starting");
  exports.client = client;
  exports.invite = `https://discordapp.com/api/oauth2/authorize?client_id=696225400191320081&permissions=19934279&scope=bot`
  const serv = require("/app/server.js");
  client.user.setStatus("idle");
  client.err = function(error) {
    require("./error.js").error(error);
  }
  client.dbl = new DBL(process.env.TOP_API)
  client.assets = require("/app/stuff/assets.json");
  client.configlist = require("/app/stuff/config.json"); // actually used by various things; believe it or not
  client.random = function(max) {
    if (!max) {
      max = 1
    }
    return Math.floor(Math.random() * max);
  }
  client.generateFooter = function() {
    var holidays = require("/app/stuff/holiday.json");
    var d = new Date();
    var footers = require("/app/stuff/footer.json")
    var r = client.random(footers.length-1);
    var f = footers[r];
    if (holidays[`${d.getMonth()+1}/${d.getDate()}`]) f = holidays[`${d.getMonth()+1}/${d.getDate()}`];
    if (holidays[`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`]) f = holidays[`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`];
    return f;
  }
  client.formatOrdinal = function(day) {
    const days = require("/app/stuff/ordinals.json");
    if (days[day]) {
      return days[day];
    } else {
      return `${day}th`
    }
  }
  client.formatDay = function(day) {
    switch (day) {
      case 0:
        return "Sunday"
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
      default:
        return false;
    }
  }
  client.formatStamp = function(ts) {
    var d = new Date(ts);
    return `${client.formatDay(d.getDay())} ${client.formatMonth(d.getMonth)} ${client.formatOrdinal(d.getDate())}, ${d.getFullYear()}`
  }
  client.formatMonth = function(month) {
    switch (month) {
      case 0:
        return "Janurary"
      case 1:
        return "Feburary"
      case 2:
        return "March"
      case 3:
        return "April"
      case 4:
        return "May"
      case 5:
        return "June"
      case 6:
        return "July"
      case 7:
        return "August"
      case 8:
        return "September"
      case 9:
        return "October"
      case 10:
        return "November"
      case 11:
        return "December"
      default:
        return false;
    }
  }
  // SQL
  const dbFile = "./.data/sqlite.db";
  const exists = fs.existsSync(dbFile);
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database(dbFile);
  db.serialize();
  client.db = db;
  client.config = {}
  var i;
  var q = `SELECT * FROM config`;
  client.db.all(q, function(err, res) {
    if (err) throw err;
    if (res[0]) {
      for (i=0;i<res.length;i++) {
        var r = res[i];
        var gl = r.guild;
        gl=gl.slice(-12);
        gl=Number(gl);
        var guild = client.guilds.find(g => g.id.includes(gl));
        if (!guild) {
          console.log(`Could not find a guild for ${r.guild} matching ${gl} and ${r.key} with ${r.value}`)
        } else {
          console.log(`${r.guild} | ${gl} | ${guild.id} | ${r.key} | ${r.value}`);
          if (!client.config[guild.id]) client.config[guild.id] = {};
          client.config[guild.id][r.key] = r.value;
        }
      }
    }
  });
  exports.db = db;
  var presences = require("/app/stuff/presence.json");
  client.prescount = 0
  var mod = 15000
  var amplify = 20;
  setInterval(function() {
    if (client.prescount > presences.length-1) {
      client.prescount = 0
    }
    var p = presences[client.prescount];
    p=p.replace(/%users%/, client.users.size+amplify*2);
    p=p.replace(/%guilds%/, client.guilds.size+amplify*2);
    client.usercount = client.users.size+amplify*2;
    client.guildcount = client.guilds.size+amplify*2
    var s = p.split(" ")[0];
    p = p.slice(s.length+1);
    client.user.setPresence({status: "online", game:{ name: p, type:s}});
    client.prescount=client.prescount+1
  }, mod);
  setInterval(function() { // will wait 60 seconds before posting
    require("/app/func/apis.js").run(client);
  }, 60000);
  setTimeout(function() {
    const server = require("/app/server.js");
    server.setClient(client);
  }, 0);
}