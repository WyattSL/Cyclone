exports.run = function(client, args) {
  var reaction = args[0];
  var user = args[1];
  var msg = reaction.message;
  var rc = client.config[msg.guild.id].reportsChannel;
  if (msg.embeds && msg.author.id == client.author.id && msg.channel == rc) {
    if (msg.embeds.first().description.includes("was reported for")) {
      var target = msg.guild.members.find(m => m.name.includes(msg.embeds.first().author.split("#")[0]));
      switch (reaction.emoji) { // ⛔ 🥾 🔇 ⚠️ ❎
        case "⛔": // ban
          if (msg.guild.member(user).hasPermission("BAN_MEMBERS", false, true, true)) {
            msg.clearReactions();
            var e = msg.embeds.first();
            var embed = new client.embed;
            embed.setTitle(e.title);
            embed.setAuthor(e.author);
            embed.setThumbnail(e.thumbnail);
            embed.setFooter(e.footer);
            embed.setDescription(e.description);
            embed.addField("Punishment", `${msg.guild.member(user).displayName}#${user.discriminator} banned the target.`);
            embed.setTimestamp();
            embed.setURL(e.url());
            msg.edit(embed);
          }
          return;
        case "🥾": // kick
          if (msg.guild.member(user).hasPermission("KICK_MEMBERS", false, true, true)) {
            msg.clearReactions();
            var e = msg.embeds.first();
            var embed = new client.embed;
            embed.setTitle(e.title);
            embed.setAuthor(e.author);
            embed.setThumbnail(e.thumbnail);
            embed.setFooter(e.footer);
            embed.setDescription(e.description);
            embed.addField("Punishment", `${msg.guild.member(user).displayName}#${user.discriminator} kicked the target.`);
            embed.setTimestamp();
            embed.setURL(e.url())
            msg.edit(embed);
          }
        case "🔇": // mute
          if (msg.guild.member(user).hasPermission("MUTE_MEMBERS", false, true, true)) {
            msg.clearReactions();
            var e = msg.embeds.first();
            var embed = new client.embed;
            embed.setTitle(e.title);
            embed.setAuthor(e.author);
            embed.setThumbnail(e.thumbnail);
            embed.setFooter(e.footer);
            embed.setDescription(e.description);
            embed.addField("Punishment", `${msg.guild.member(user).displayName}#${user.discriminator} muted the target.`);
            embed.setTimestamp();
            embed.setURL(e.url())
            msg.edit(embed);
          }
        case "⚠️": // warn
          if (msg.guild.member(user).hasPermission("MANAGE_MESSAGES", false, true, true)) {
            msg.clearReactions();
            var e = msg.embeds.first();
            var embed = new client.embed;
            embed.setTitle(e.title);
            embed.setAuthor(e.author);
            embed.setThumbnail(e.thumbnail);
            embed.setFooter(e.footer);
            embed.setDescription(e.description);
            embed.addField("Punishment", `${msg.guild.member(user).displayName}#${user.discriminator} muted the target.`);
            embed.setTimestamp();
            embed.setURL(e.url())
            msg.edit(embed);
          }
      }
    }
  }
};