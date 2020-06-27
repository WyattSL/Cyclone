const got = require('got');

exports.run = function(client, msg, args) {
    msg.channel.send("Please wait...").then(async ms => {
        var user = args.join(" ");
        var url = `https://www.roblox.com/search/users/results?keyword=${user}&maxRows=1&startIndex=0`
        var req = await got(url);
        var res = JSON.parse(req.body).UserSearchResults;
        if (!res[0]) {
            return 2;
        }
        var id = res[0].UserId
        var embed = new client.embed;
        embed.setTitle("Roblox Data Retrieval")
        embed.setFooter(client.generateFooter())
        embed.setColor(0x000000)
        var url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=150x150&format=png`
        var areq = await got(url);
        var ares = JSON.parse(areq.body).data[0]
        embed.setAuthor(res[0].DisplayName, ares.imageUrl)
        var url = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${id}&size=352x352&format=png`;
        var breq = await got(url);
        var bres = JSON.parse(breq.body).data[0];
        embed.setThumbnail(bres.imageUrl);
        embed.setURL(`https://roblox.com/users/${id}/profile`);
        var url = `https://www.roblox.com/search/users/presence?userIds=${id}`;
        var req = await got(url);
        var res = JSON.parse(req.body).PlayerPresences[0];
        ms.edit(embed);
    });
}

exports.usage = "roblox <user>"
exports.description = "Get data on a roblox user."
exports.example = "roblox WyattPlayzPC"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]