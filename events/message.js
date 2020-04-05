module.exports = (client, args) => {
  var msg = args[0];
  if (msg.author.bot) return false;
  if (msg.mentions.users.first() && msg.mentions.users.first().id == client.user.id) {
    msg.channel.send(
      `The prefix on ${msg.guild.name} is ${client.config[msg.guild.id].prefix}`
    );
    return true;
  }
  var target = msg.content.split
  var module = `/app/commands/${target}.js`
};
