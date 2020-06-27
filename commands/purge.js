exports.run = function(client, msg, args) {
    if (!args) {
        var x = "``";
        msg.channel.send(`Incorrect usage! ${x}${this.usage}${x}`);
    } else {
        var i;
        var members = msg.guild.members.array()
        var kicked = [];
        for (i=0;i<members.length;i++) {
            if (members[i].user.username.includes(args.join(" ")) && members[i].kickable) {
                members[i].kick(`PURGE by ${msg.author.tag} ON CONTEXT ${args.join(" ")}`);
                kicked.push(members[i].user.tag);
            }
        }
        var x = "``"
        msg.channel.send(`Purged ${x}${kicked.length}${x} members on context ${x}${args.join(" ")}${x}. Members include: ${x}${kicked.concat(" | ")}.${x}`)
    }
}
  
exports.usage = "purge <name>"
exports.description = "Kick users matching criteria."
exports.example = "ping"
exports.p = ["KICK_MEMBERS", "SEND_MESSAGES"]
exports.permission = "KICK_MEMBERS"