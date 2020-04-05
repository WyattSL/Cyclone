module.exports = (client, args) => {
  var msg = args[0]
  if (msg.author.bot) return false;
  if (msg.mentions.users.first() && msg.mentions.users.first().id == client.user.id) {
    msg.channel.send(`They `)
  }
};