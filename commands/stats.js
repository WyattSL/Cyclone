exports.run = function(client, msg, args) {
    var e = new client.embed;
    e.setTitle(msg.guild.name)
    e.setThumbnail(msg.iconURL)
    e.setAuthor(msg.guild.owner.user.tag, msg.guild.owner.user.displayAvatarURL)
    var channels = [
        `Total Channels: ${msg.guild.channels.size}`,
        ``
    ]
    e.addField(channels.concat("\n"))
}
  
exports.usage = "stats"
exports.description = "Retrieve stats on the guild."
exports.example = "stats"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]