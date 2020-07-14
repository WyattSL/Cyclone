const got = require("got");

async function validate(row, client, user) {
  var url = `https://id.twitch.tv/oauth2/validate`;
  var req = await got(url, {
    throwHttpErrors: false,
    headers: {
      Authorization: `OAuth ${row.token}`
    }
  });
  console.log(req.body);
  var res = JSON.parse(req.body);
  if (res.status && res.status == 401) {
    // invalid!!!!!!!!!!!!!!
    var refresh = row.refresh
    var url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCHID}&client_secret=${process.env.TWITCHSEC}&refresh_token=${refresh}&grant_type=refresh_token`;
    var req = await got.post(url, {
      throwHttpErrors: false
    });
    var res = JSON.parse(req.body);
    var q = `DELETE FROM links WHERE user=? AND service="twitch"`;
    client.db.run(q, user)
    var q = `INSERT INTO links ("user", "service", "token", "refresh") VALUES (@0, "twitch", @1, @2);`;
    client.db.run(q, user, res.access_token, res.refresh_token);
    return "redo";
  }
}

async function getChannel(query, auth) {
  console.log(`Channel Search Request`)
  var url = `https://api.twitch.tv/helix/search/channels?query=${query}&first=1`
  console.log(auth);
  var req = await got(url, {
    throwHttpErrors: false,
    headers: {
      "client-id": process.env.TWITCHID,
      Authorization: `Bearer ${auth}`
    }
  });
  console.log(`Request Finished with data ${req.body}`);
  var res = JSON.parse(req.body).data[0];
  console.log(`Request Fulfilled`)
  return res;
}

async function resolveGame(id, auth) {
  var url = `https://api.twitch.tv/helix/games?id=${id}`;
  var req = await got(url, {
    headers: {
      "client-id": process.env.TWITCHID,
      Authorization: `Bearer ${auth}`
    }
  });
  var res = JSON.parse(req.body).data[0];
  return res;
}

exports.run = async function(client, msg, args) {
  if (!args[0]) return 1;
  var q = `SELECT * FROM links WHERE service="twitch" AND user=?`
  client.db.get(q, msg.author.id, async function(err, row) {
    if (err) throw err;
    if (!row) {
      var x = "``";
      var prefix = client.config[msg.guild.id].prefix || ".";
      msg.channel.send(`Your account is not linked. To link your account, please use ${x}${prefix}link twitch${x}`);
      return;
    }
    validate(row, client, msg.author.id).then(res => {
      if (res == "redo") {
        this.run(client, msg, args);
        return;
      }
    });
    var t1 = args.shift();
    switch (t1) {
      case "channel":
        var e = new client.embed;
        var ch = await getChannel(args.join(" "), row.token);
        console.log(ch);
        if (!ch) {
          msg.channel.send("I could not find the channel specified.");
          return;
        }
        e.addField(`Channel ID`, ch.id);
        e.setAuthor(ch.display_name)
        if (ch.game_id && ch.game_id != 0) {
          var game = await resolveGame(ch.game_id, row.token);
          e.setTitle(game.name);
          e.setImage(game.box_art_url);
        } else {
          e.setTitle(`Not in-game`)
        }
        if (ch.thumbnail_url) e.setThumbnail(ch.thumbnail_url);
        if (ch.is_live) {
          e.setFooter(`${client.generateFooter()} | Streaming Since`);
          e.setTimestamp(ch.started_at)
        } else {
          e.setFooter(client.generateFooter());
        }
        msg.channel.send(e);
        break;
      default:
        var x = "``";
        msg.channel.send(`Invalid Params. ${x}${this.usage}${x}`);
        break;
    }
  });
};

exports.usage = "twitch <channel>"