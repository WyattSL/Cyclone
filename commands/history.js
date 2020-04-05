exports.run = function(client, msg, args) {
  var xu = `https://wl-cyclone.glitch.me/img/X`
  var ping = args.shift();
  var target = msg.mentions.users.first();
  if (!target) {
    target = msg.guild.members.find(m => m.displayName.includes(ping))
    if (!target) {
      target = msg.guild.members.find(m => m.user.username.includes(ping))
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
  if (!type) type = "*"
  console.log(type);
  var query = `SELECT * FROM punishments WHERE user=@0 AND type=@1 AND guild=@2`;
  client.db.all(query, target.id, type, server, function(err, results) {
    if (err) {
      msg.channel.send("I ran into an error. ```fix\n" + err + "```");
      throw err;
    }
    if (!results[0]) {
      var e = new client.embed;
      e.setColor(0xFF0000);
      e.setFooter(client.generateFooter());
      e.setTitle(`Error`);
      e.setDescription(`I could not find any punishments for ${target} matching ${type} in ${server}`)
      e.setThumbnail(xu);
      msg.channel.send(e);
    } else {
      if (results.length > 26) {
        msg.channel.send("I cannot fit all the punishments into an embed. Please filter the history. [" + client.generateFooter() + "]");
        return;
      }
      var i;
      var e = new client.embed;
      e.setTitle(`Oh boy. Here we go again.`);
      e.setDescription(`Listing punishments for ${target}.`);
      e.setColor(0x0000FF);
      e.setFooter(client.generateFooter());
      for (i=0;i<results.length;i++) {
        var p = results[i];
        var type = p.type;
        var guild = `[${p.guild}] ${client.guilds.find(g => g.id == p.guild).name}`;
        e.addField(type, guild, false);
      }
      msg.channel.send(e);
    }
  });
}

exports.description = "View punishment history."
exports.example = "history @WyattL#3477 global"
exports.usage = "history User [ServerID|global(default=current)] [Type(default=all)]"