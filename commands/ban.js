exports.run = function(client, msg, args) {
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
      console.log(r);
      if (r == "❌") {
        e.setDescription(`Ban cancelled.`);
        e.setColor(0xFF0000);
        m.edit("Embed:", e);
        m.clearReactions();
        collector.stop();
      } else if (r == "✔️") {
        e.setDescription(`Ban confirmed.`);
        e.setColor(0x00FF00);
        m.edit("Embed:", e);
        m.clearReactions();
        collector.stop();
      }
    });
    collector.on('end', collected => {
      if (collected < 1) {
        e.setDescription(`You did not make a selection in time.`);
        e.setColor(0x000000);
        m.edit("Embed:", e);
        m.clearReactions();
      }
    });
  });
  return true;
}