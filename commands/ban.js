exports.run = function(client, msg, args) {
  var xu = `https://wl-cyclone.glitch.me/img/X`
  args.shift(); // shift the command out of the array (index 0)
  var ping = args.shift(); // [moved from 1->0] shift the ping out of the array (index 1)
  var reason = args.join(" ");
  if (!reason) {
    reason = "The ban hammer has spoken!"
  }
  var target = msg.mentions.members.first();
  if (!target) {
    target = msg.guild.members.find(m => m.displayName.includes(target))
    if (!target) {
      target = msg.guild.members.find(m => m.username.includes(target))
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
  if (target.id == msg.guild.owner.id) {
    var e = new client.embed;
    e.setTitle(`Error`);
    e.setDescription(`The owner cannot be banned, silly!`);
    e.setColor(0xFF0000);
    e.setFooter(client.generateFooter());
    e.setThumbnail(xu);
    msg.channel.send(e);
    return false;
  }
  if (target.highestRole.position > msg.member.highestRole.position) {
    var e = new client.embed;
    e.setTitle(`Error`);
    e.setDescription(`You are not a high enough role to ban this person. ${target.highestRole.name} > ${msg.membe.highestRole.name}`);
    e.setColor(0xFF0000);
    e.setFooter(client.generateFooter())
    e.setThumbnail(`https://wl-cycle.glitch.me/img/x`)
    msg.channel.send(e);
    return false;
  }
  if (!target.bannable) {
    var e = new client.embed;
    e.setTitle(`Error`);
    e.setDescription(`I cannot ban ${target.displayName}. I either do not have permission to ban members, or they are a higher role than me.`);
    e.setColor(0xFF0000);
    e.setFooter(client.generateFooter());
    e.setThumbnail(xu);
    msg.channel.send(e);
    return false;
  }
  var banner = msg.author
  var guild = msg.guild
  var t = Date.now()
  var e = new client.embed;
  e.setTitle(`Ban`)
  e.setDescription(`Are you sure you want to ban ${target.displayName}?`);
  e.setAuthor(target.user.username, target.user.avatarURL)
  e.setColor(0x0000FF);
  e.setFooter(client.generateFooter());
  msg.channel.send(e).then(m => {
    m.react("❌")
    m.react("✔️")
    var filter = (reaction, user) => user.id == msg.author.id;
    var collector = m.createReactionCollector(filter, { time: 15000 });
    collector.on('collect', r => {
      console.log(r.emoji.name + "collected");
      if (r.emoji.name == "❌") {
        e.setDescription(`Ban cancelled.`);
        e.setColor(0xFF0000);
        m.edit(e);
        m.clearReactions();
        collector.stop();
      } else if (r.emoji.name == "✔️") {
        e.setDescription(`Ban confirmed. ${target.displayName} has been banned for: ${reason}`);
        e.setColor(0x00FF00);
        m.edit(e);
        m.clearReactions();
        collector.stop();
        var msg = `You were been banned from ${msg.guild.name} for ${reason} by ${msg.member.displayName}. You can contact the owner at ${msg.guild.owner.user.username}#${msg.guild.owner.user.discriminator}.`
        target.send(msg);
        target.ban(`Banned by ${msg.author.username}#${msg.author.discriminator} for ${reason}`)
        var query = `INSERT INTO punishments ("type", "user", "guild", "reason") VALUES ("ban", @0, @1, @2)`;
        client.db.run(query, target.user.id, target.guild.id, reason);
      } else {
        console.log(r.emoji.name + ' did not match filter...')
      }
    });
    collector.on('end', collected => {
      if (collected.size < 1) {
        e.setDescription(`You did not make a selection in time.`);
        e.setColor(0x000000);
        m.edit(e);
        m.clearReactions();
      }
    });
  });
  return true;
}

exports.permission = "BAN_MEMBERS"
exports.description = "Permanently remove someone from the guild."
exports.example = "ban @idiot Excessive Stupidity"
exports.usage = "ban @user reason"