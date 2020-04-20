exports.run = function(client, msg, args) {
  var user = msg.mentions.members.first();
  var target;
  if (!user) {
    var inp = args.shift();
    user = msg.guild.members.find(m => m.displayName.includes(inp));
    if (!user) {
      user = msg.guild.members.find(m => m.user.username.includes(inp));
      if (!user) {
        msg.channel.send(`I failed to find a user matching ${inp}.`);
      }
    }
  } else {
    target = user;
  }
};

exports.usage = "report <user> <reason>";
exports.description = "Report a user; user can be a ping, userid, or displayname.";
exports.p = ["SEND_MESSAGES", "ADD_REACTIONS", "EMBED_LINKS"];
exports.example = "report @Wyatt having intelligence"