module.exports = (client, args) => {
  var msg = args[0];
  if (msg.author.bot) return false;
  if (msg.mentions.users.first() && msg.mentions.users.first().id == client.user.id) {
    msg.channel.send(
      `The prefix on ${msg.guild.name} is ${client.config[msg.guild.id].prefix}`
    );
    return true;
  } else if (!msg.content.startsWith(client.config[msg.guild.id].prefix)) {
    return false;
  }
  var target = msg.content.slice(client.config[msg.guild.id].prefix.length).split(" ")[0]
  var module = `/app/commands/${target}.js`
};
