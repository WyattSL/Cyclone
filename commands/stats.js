exports.run = function(client, msg, args) {
    var e = new client.embed;
    e.setTitle(msg.guild.name)
    e.setThumbnail(msg.iconURL)
    e.setAuthor(msg.guild.owner.user.tag, msg.guild.owner.user.displayAvatarURL)
    var channels = [
        `Total Channels: ${msg.guild.channels.size}`,
        `Text Channels: ${msg.guild.channels.filter(ch => ch.type == "text").size}`,
        `Voice Channels: ${msg.guild.channels.filter(ch => ch.type == "voice").size}`,
        `Categories: ${msg.guild.channel.filter(ch => ch.type == "category").size}`
    ]
    e.addField("Channels", channels.concat("\n"))
    var roles = [
        `Total: ${msg.guild.roles.size}`,
        `--- List ---`,
        `${msg.guild.roles.concat("\n")}`
    ]
}
  
exports.usage = "stats"
exports.description = "Retrieve stats on the guild."
exports.example = "stats"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]