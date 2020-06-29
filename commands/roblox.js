const got = require('got');

async function searchUser(user) {
    var url = `https://www.roblox.com/search/users/results?keyword=${user}&maxRows=1&startIndex=0`
    var req = await got(url);
    var res = JSON.parse(req.body).UserSearchResults;
    if (!res[0]) {
        return 2;
    }
    return res[0];
}

async function resolveGroup(id) {
    var url = `https://groups.roblox.com/v1/groups/${id}`
    var req = await got(url)
    return JSON.parse(req.body);
}

async function resolvePrimaryGroup(user) {
    var url = `https://groups.roblox.com/v1/users/${user}/groups/primary/role`;
    var req = await got(url);
    return JSON.parse(req.body);
}

async function resolveUserGroups(user) {
    var url = `https://api.roblox.com/users/${user}/groups`;
    var req = await got(url);
    return JSON.parse(req.body);
}

async function getUserHeadshot(id) {
    var url = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${id}&size=150x150&format=png`
    var areq = await got(url);
    var ares = JSON.parse(areq.body).data[0]
    return ares;
}

async function resolveUserCreations(id) {
    var url = `https://games.roblox.com/v2/users/{userId}/games?userId=${id}`;
    var req = await got(url);
    var res = JSON.parse(req.body);
    return res.data;
}

exports.run = function(client, msg, args) {
    var type = args.shift();
    var type2 = args.shift();
    if (!type || !type2) {
        return 1;
    }
    msg.channel.send("Please wait...").then(async ms => {
        switch(type) {
            case "user":
                switch(type2) {
                    case "info":
                        var user = await searchUser(args.join(" "))
                        var id = user.UserId
                        var embed = new client.embed;
                        embed.setTitle("Roblox Data Retrieval: user Lookup")
                        embed.setFooter(client.generateFooter())
                        embed.setColor(0x000000)
                        embed.setAuthor(user.DisplayName, getUserHeadshot(id).imageUrl)
                        var url = `https://thumbnails.roblox.com/v1/users/avatar?userIds=${id}&size=352x352&format=png`;
                        var breq = await got(url);
                        var bres = JSON.parse(breq.body).data[0];
                        embed.setThumbnail(bres.imageUrl);
                        embed.setURL(`https://roblox.com/users/${id}/profile`);
                        var url = `https://users.roblox.com/v1/users/110946117`;
                        var req = await got(url);
                        var res = JSON.parse(req.body)
                        var d = new Date(res.created)
                        embed.addField(`Account Created`, d)
                        embed.setDescription(res.description);
                        if (res.isBanned) embed.setDescription(`${client.emoji("dblMod")} This user is banned.`)
                        ms.edit(embed);
                        break;
                    case "groups":
                        var user = await searchUser(args.join(" "));
                        var groups = await resolveUserGroups(user.UserId);
                        var i;
                        var embed = new client.embed;
                        embed.setTitle("Roblox Data Retrieval: User Groups");
                        embed.setAuthor(user.DisplayName, getUserHeadshot(user.UserId).imageUrl)
                        embed.setFooter(client.generateFooter())
                        embed.setURL(`https://roblox.com/users/${user.UserId}/profile`);
                        for (i=0;i<groups.length;i++) {
                            var g = groups[i]
                            embed.addField(g.Name, g.Role, false);
                        }
                        ms.edit(embed);
                        break;
                    case "creations":
                        var user = await searchUser(args.join(" "));
                        var creations = await resolveUserCreations(user.UserId);
                        var i;
                        var embed = new client.embed;
                        embed.setTitle("Roblox Data Retrieval: User Creations");
                        embed.setURL(`https://roblox.com/users/${user.UserId}/profile`);
                        embed.setFooter(client.generateFooter());
                        for (i=0;i<creations.length;i++) {
                            if (i == 24) break;
                            var g = creations[i];
                            var modified = new Date(g.updated);
                            var created = new Date(g.created);
                            embed.addField(`${g.name}`, `${g.description}\n${created}\n${modified}`)
                        }
                        ms.edit(embed);
                        break;
                    default:
                        ms.delete();
                        return 1;
                    }
                break;
            default:
                ms.delete();
                return 1;
        }
    });
}

exports.usage = "roblox <user/group/game> <creations/info/inventory/badges/groups | creations/info | media/info/badges>"
exports.description = "Get data on a roblox user."
exports.example = "roblox WyattPlayzPC"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]