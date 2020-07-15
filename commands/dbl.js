exports.run = async function(client, msg, args) {
    const dbl = client.dbl;
    var type = args.shift();
    if (!type) {
        return 1;
    }
    msg.channel.send(`Please wait...`).then(async ms => {
        if (type == "bot") {
            var query = args.join(" ");
            var bot;
            if (!Number(query)) {
                var bots = await dbl.getBots({limit: 1, search: "username: " + query})
                console.log(bots);
                if (bots.results && bots.results[0]) {
                    bot = bots.results[0];
                } else {
                    ms.delete();
                    return 2;
                }
            } else {
                bot = dbl.getBot(query)
            }
            console.log(bot);
            var embed = new client.embed;
            embed.setTitle("Discord Bot List");
            embed.setURL("https://top.gg/bot/" + bot.id);
            embed.setAuthor(bot.username, `https://images.discordapp.net/avatars/${bot.id}/${bot.avatar}?size=512`);
            embed.setFooter(client.generateFooter());
            var links = `[Invite](${bot.invite})`
            if (bot.website) links = links+`, [Website](${bot.website})`;
            if (bot.support) links = links+`, [Support](https://discord.gg/${bot.support})`;
            if (bot.github) links = links+`, [Github](${bot.github})`;
            embed.addField("Links", links, true)
            embed.setDescription(bot.shortdesc);
            embed.addField("Prefix", bot.prefix, true);
            embed.addField("Library", bot.lib, true);
            embed.addField("Owners", bot.owners, true);
            embed.addField("Tags", bot.tags.concat(), true);
            embed.addField("Points", `${bot.monthlyPoints}/${bot.points}`, true);
            embed.addField("ID", bot.clientid, true)
            if (bot.certifiedBot) {
                embed.addField("Certified", client.Emoji("dblCertified"), true);
            } else {
                embed.addField("Certified", ":x:", true)
            }
            ms.edit(embed);
        } else if (type == "user") {
          msg.reply("stfu");
        } else {
            ms.delete();
            return 1;
        }
    });
};

exports.usage = "dbl <bot/user> <name/id>"
exports.description = "Retrieve info about a top.gg bot or user."
exports.example = "dbl bot Cyclone | dbl user WyattL"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]