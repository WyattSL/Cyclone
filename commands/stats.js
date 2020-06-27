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
    e.addField("Roles", roles.concat("\n"));
    if (msg.guild.description) e.addField("Description", msg.guild.description);
    if (msg.guild.features) e.addField("Features", msg.guild.features.concat(", "));
    if (msg.guild.premiumSubscriptions) e.addField(`Tier ${msg.guild.premiumTier}`, `:booster: ${msg.guild.premiumSubscriptions}`);
    if (msg.guild.region) e.addField(`Region`, msg.guild.region)
    if (msg.guild.verified) e.addField(`Verified`, `:heavy_check_mark:`)
    e.setFooter(`${client.generateFooter} | Guild created at`);
    e.setTimestamp(msg.guild.createdTimestamp)
    msg.channel.send(e);
}
  
exports.usage = "stats"
exports.description = "Retrieve stats on the guild."
exports.example = "stats"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]