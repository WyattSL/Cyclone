const got = require("got");

exports.run = function(client, msg, args) {
    var type = args.shift();
    if (!type) {
        return 1;
    }
    if (type == "server") {
        var ip = args.shift();
        var port = args.shift() || ip.split(":")[1] || 25565;
        ip = toNumber(ip);
        port = toNumber(port);
        if (!ip || !port) {
            return 1;
        }
        var url = `https://mcapi.us/server/status?ip=${ip}&port=${port}`;
        var req = await got(url);
        var res = req.body;
        if (!res) {
            return 2;
        }
        res = JSON.parse(req.body);
        if (res.status == "success") {

        } else {
            var e = new RichEmbed;
            e.setFooter(client.generateFooter());
            e.setTitle("Error");
            e.setColor(0xFF0000);
            e.setThumbnail(client.assets.X);
            e.setDescription("A error has occured whilst processing your request. **This is not my fault!**");
            e.
        }
    }
}