exports.run = function(client, msg, args) {
  var ping = args.shift();
  var target = msg.mentions.members.first();
  if (!target) {
    target = msg.guild.members.find(m => m.displayName.includes(ping))
    if (!target) {
      target = msg.guild.members.find(m => m.username.includes(ping))
      if (!target) {
        var e = new client.embed;
        e.setTitle("Error")
        e.setColor(0xFF0000);
        e.setFooter(client.generateFooter())
        e.setThumbnail(`https://wl-cyclone.glitch.me/img/X`);
        e.setDescription(`Please specify a user!`);
        msg.channel.send(e);
        return false;
      }
    }
  }
  var server = args[0] || msg.guild.id
  if (server.toLowerCase() == "global") server = "*"
  var type = args[1] || "*"
  var query = `SELECT * FROM punishments WHERE user=@0 AND type=@1 AND guild=@2"`;
  client.db.all(query, target.id, type, server, function(err, results) {
    if (err) {
      msg.channel.send("I ran into an error. ```fix\n" + err + "```");
      throw err;
    }
    if (!results[0]) {
      var e = new client.embed;
    } else {
      if (results.length > 26) {
        msg.channel.send("I cannot fit all the punishments into an embed. Please filter the history. [" + client.generateFooter() + "]");
        return;
      }
      var i;
      for (i=0;i<results.length;i++) {
        var p = results[i];
        var type = p.type;
        var user = p.user;
        var guild = p.guild;
      }
    }
  });
}

exports.description = "View punishment history."
exports.example = "history @WyattL#3477 global"
exports.usage = "history User [ServerID|global(default=current)] [Type(default=all)]"