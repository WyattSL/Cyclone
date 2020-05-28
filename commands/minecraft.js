const got = require("got");

exports.run = async function(client, msg, args) {
    var type = args.shift();
    if (!type) {
        return 1; // invalid param
    }
    if (type == "server") {
        var ip = args.shift();
        var port = ip.split(":")[1] || 25565;
        port = Number(port);
        if (!ip || !port) {
            return 1; // invalid param
        }
        var url = `https://mcapi.us/server/status?ip=${ip}&port=${port}`;
        var req = await got(url);
        var res = req.body;
        if (!res) {
            return 2; // internal error
        }
        res = JSON.parse(req.body);
        if (res.status == "success") {
            var e = new client.embed;
            if (res.last_updated) {
                e.setFooter(client.generateFooter() + " | Last Updated");
                e.setTimestamp(res.last_updated);
            } else {
                e.setFooter(client.generateFooter());
            }
            e.setTitle("Minecraft Server Lookup");
            if (res.server.name) {
                var asset = client.assets[res.server.name.split(" ")[0]]
                if (asset) {
                    e.setAuthor(res.server.name, asset);
                } else {
                    e.setAuthor(res.server.name)
                }
            }
            if (res.motd) e.setDescription(res.motd);
            if (res.online) e.setThumbnail(client.assets.ONLINE);
            if (!res.online) e.setThumbnail(client.assets.OFFLINE);
            //if (res.last_online) e.addField(`Last Online`, client.formatStamp(res.last_online));
            if (res.players.max) {
                if (res.players.now) {
                    e.addField(`Max Players`, res.players.max);
                } else {
                    e.addField(`Players`, `${res.players.now}/${res.players.max}`)
                }
            } else if (res.players.now) {
                e.addField(`Players Online`, res.players.now)
            }
            msg.channel.send(e);
            return 0;
        } else {
            var e = new client.embed;
            e.setFooter(client.generateFooter());
            e.setTitle("Error");
            e.setColor(0xFF0000);
            e.setThumbnail(client.assets.X);
            e.setDescription("A error has occured whilst processing your request. **This is not my fault!**");
            e.addField("Success?", res.status);
            e.addField("Error Message", res.error)
            msg.channel.send(e);
            return 0; // success
        }
    }
}