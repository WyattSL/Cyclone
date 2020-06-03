exports.run = function(client, msg, args) {
    var q = `SELECT * FROM profiles WHERE user=?`;
    client.db.all(q, msg.author.id, function(err, res) {
        if (err) throw err;
        if (!res[0]) {
            var e = new client.embed;
            e.setTitle("Error!");
            e.setColor(0xFF0000);
            e.setDescription(`Your birthday is not set. You can set it [here.](https://cyclone.tk/profile)`);
            e.setFooter(client.generateFooter());
            e.setTimestamp();
            msg.channel.send(e);
        } else {
            var bday = new Date(res[0].birthday);
            var cday = new Date();
            var age = bday.getFullYear()-cday.getFullYear()
            var e = new client.embed;
            e.setTitle(`Birthday`);
            e.setColor(0x0000FF);
            var x = "```";
            e.setDescription(`You will turn ${x}${age}${x}`);
            e.setFooter(client.generateFooter())
        }
    });
}