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
            var links = `[Invite](${bot.invite})`
            if (bot.website) links = links+`, [Website](${bot.website})`;
            if (bot.support) links = links+`, [Support](${bot.support})`;
            if (bot.github) links = links+`, [Github](${bot.github})`;
            embed.addField("Links", links)
            embed.setDescription(bot.shortdesc);
            embed.addField("Prefix", bot.prefix);
            embed.addField("Library", bot.lib);
            embed.addField("ID", bot.clientid);
            embed.addField("Tags", bot.tags.concat());
            embed.addField("Points", `${bot.monthlyPoints}/${bot.points}`);
            if (bot.certifiedBot) {
                embed.addField("Certified", ":dblCertified:");
            } else {
                embed.addField("Certified", ":x:")
            }
            ms.edit(embed);
        } else if (type == "user") {

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