exports.run = function(client, msg, args) {
  var user = msg.mentions.members.first();
  var target;
  var inp = args.shift();
  if (!user) {
    user = msg.guild.members.find(m => m.displayName.includes(inp));
    if (!user) {
      user = msg.guild.members.find(m => m.user.username.includes(inp));
      if (!user) {
        msg.channel.send(`I failed to find a user matching ${inp}.`);
        return;
      } else {
        target = user;
      }
    } else {
      target = user;
    }
  } else {
    target = user;
  }
  var ch = msg.guild.channels.find(ch => ch.id.includes(client.config[msg.guild.id].reportsChannel));
  if (!ch) {
    var q = "```"; // because I hate doing the bunches of breaks (\)
    msg.channel.send(`A reports channel has not yet been defined. Please use ${q}config reportChannel #channel${q}`)
    return false;
  } else {
    msg.channel.send("alrighty").then(m => {
      var reason = args.join(" ");
      var e = new client.embed;
      e.setTitle("Click here to visit the message.");
      e.setDescription(`${user.user.username}#${user.user.discriminator} reported ${target.user.username}#${target.user.discriminator} for ${reason}.`);
      e.setThumbnail(target.user.displayAvatarURL);
      e.setFooter(client.generateFooter());
      e.setTimestamp();
      e.setURL(m.url);
      e.setAuthor(`${target.displayName}#${target.discriminator}`, target.user.displayAvatarURL);
      ch.send(e);
    });
  };
};

exports.usage = "report <user> <reason>";
exports.description = "Report a user; user can be a ping, userid, or displayname.";
exports.p = ["SEND_MESSAGES", "ADD_REACTIONS", "EMBED_LINKS"];
exports.example = "report @Wyatt having intelligence"