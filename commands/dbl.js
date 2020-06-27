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
            embed.setAuthor(bot.username, bot.avatar)
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