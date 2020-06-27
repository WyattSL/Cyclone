exports.run = async function(client, msg, args) {
    msg.guild.fetch().then(guild => {
        msg.guild = guild;
        var e = new client.embed;
        e.setTitle(guild.name)
        e.setThumbnail(msg.iconURL)
        if (guild.owner) e.setAuthor(guild.owner.user.tag, guild.owner.user.displayAvatarURL)
        var channels = [
            `Total Channels: ${guild.channels.size}`,
            `Text Channels: ${guild.channels.filter(ch => ch.type == "text").size}`,
            `Voice Channels: ${guild.channels.filter(ch => ch.type == "voice").size}`,
            `Categories: ${guild.channels.filter(ch => ch.type == "category").size}`
        ]
        e.addField("Channels", channels.concat("\n"))
        var roles = [
            `Total: ${guild.roles.size}`,
            `--- List ---`,
            `${guild.roles.array().concat("\n")}`
        ]
        e.addField("Roles", roles.concat("\n"));
        if (guild.description) e.addField("Description", guild.description);
        if (guild.features) e.addField("Features", guild.features.array().concat(", "));
        if (guild.premiumSubscriptionCount) e.addField(`Tier ${guild.premiumTier}`, `:booster: ${guild.premiumSubscriptionCount}`);
        if (guild.region) e.addField(`Region`, guild.region)
        if (guild.verified) e.addField(`Verified`, `:heavy_check_mark:`)
        e.setFooter(`${client.generateFooter()} | Guild created on`);
        e.setTimestamp(guild.createdTimestamp)
        msg.channel.send(e);
    });
}
  
exports.usage = "stats"
exports.description = "Retrieve stats on the guild."
exports.example = "stats"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]