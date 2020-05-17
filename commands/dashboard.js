const crypto = require("crypto");

exports.run = function(client, msg, args) {
  var q = `DELETE FROM weblinks WHERE guild=?`;
  client.db.run(q, msg.guild.id);
  var secret = process.env.SECRET
  var hash = crypto.createHmac('sha256', secret)
   .update(msg.guild.id)
   .digest('hex');
  console.log(hash);
  var q = `INSERT INTO weblinks ("guild", "hash") VALUES (@0, @1)`;
  client.db.run(q, msg.guild.id, hash);
  var embed = new client.embed;
  embed.setTitle("Cyclone Control");
  embed.setDescription("aka Web Dashboard");
  embed.addField("I didn't request this?", `Than something really messed up and you should tell me posthaste.`);
  embed.addField(`Do not share this link with anyone else!`, `[Click here to access the web dashboard.](https://wl-cyclone.glitch.me/dashboard/${msg.guild.id}/${hash})`);
  embed.setColor(0x0000FF);
  embed.setFooter(client.generateFooter());
  embed.setTimestamp();
  msg.guild.owner.send(embed);
};

exports.owneronly = true;
exports.description = "Receive a link to login to the website dashboard.";
exports.usage = "dashboard";
exports.example = "dashboard";