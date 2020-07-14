exports.run = function(client, msg, args) {
  var id = msg.author.id;
  id = Buffer.from(id).toString("hex");
  var url = `https://cyclone.tk/link/${id}/${args.join(" ")}`;
  msg.reply(`A message should of been sent to your DMs. If not, please permit me to DM you!`)
  var e = new client.embed;
  e.setTitle(`CLICK HERE`);
  e.setDescription(`To link your account.`);
  e.setFooter(client.generateFooter());
  e.setURL(url);
  msg.author.send(e);
}

exports.usage = "link <twitch/epic/steam>";
exports.example = "link twitch";
exports.description = "Link your account with a service."
exports.p = ["SEND_MESSAGES"]