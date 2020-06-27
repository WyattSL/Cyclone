exports.run = function(client, msg, args) {
    var user = args.join(" ");
    var url = ``
    var req = await got(url);
}

exports.usage = "roblox <user>"
exports.description = "Get data on a roblox user."
exports.example = "roblox WyattPlayzPC"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]