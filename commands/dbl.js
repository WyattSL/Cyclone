exports.run = function(client, msg, args) {
    const dbl = client.dbl;
    var type = args.shift();
    if (!type) {
        return 1;
    }
    if (type == "bot") {
        
    } else if (type == "user") {

    } else {
        return 1;
    }
};

exports.usage = "dbl <bot/user> <name/id>"
exports.description = "Retrieve info about a top.gg bot or user."
exports.example = "dbl bot Cyclone | dbl user WyattL"
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]