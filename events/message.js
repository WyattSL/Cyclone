const fs = require("fs");
const aliases = require("/app/stuff/alias.json");

function swearCheck(client, msg) {
  const list = require("/app/stuff/words.json");
  var i;
  var replacetext;
  for (i = 0; i < list.length; i++) {
    if (msg.content.includes(list[i])) {
      if (msg.deletable && !msg.deleted) msg.delete();
      if (!replacetext) replacetext = msg.content;
      var x = "";
      var y;
      for (y=0;y<list[i].length;y++) {
        x=x+"#"
      }
      var reg = new RegExp(list[i], "g");
      replacetext = replacetext.replace(reg, x);
    }
  }
  if (replacetext) {
    var name = msg.member.displayName;
    var av = msg.author.displayAvatarURL;
    msg.channel.createWebhook(name, av, "Swear Filter").then(Webhook => {
      Webhook.send(replacetext);
      setTimeout(function() {
        Webhook.delete("Swear Filter : Cleanup");
      }, 500)
    });
  }
}

function inviteCheck(client, msg) {
  if (msg.content.includes("discord.gg/")) {
    msg.delete();
    msg.channel.send(`:scream: ${msg.member.displayName}! How dare you? We do not post invites here!`)
  }
}

exports.run = (client, args) => {
  var RichEmbed = client.embed;
  var msg = args[0];
  console.log(
    "@" +
      msg.member.displayName +
      " said " +
      msg.content +
      " in " +
      msg.guild.name +
      " on #" +
      msg.channel.name
  );
  if (msg.author.bot) return false;
  if (!client.config[msg.guild.id]) client.config[msg.guild.id] = {};
  var prefix = client.config[msg.guild.id].prefix || "."; // get the prefix; if it is not set, the prefix will default to "."
  if (
    msg.mentions.users.first() &&
    msg.mentions.users.first().id == client.user.id
  ) {
    msg.channel.send(`The prefix on ${msg.guild.name} is \`\`${prefix}\`\``);
    return true;
  } else if (!msg.content.startsWith(prefix)) {
    if (client.config[msg.guild.id].swearFilter == "true") {
      swearCheck(client, msg);
    }
    if (client.config[msg.guild.id].inviteFilter == "true") {
      inviteCheck(client, msg);
    }
    return false;
  }
  var target = msg.content.slice(prefix.length).split(" ")[0];
  if (aliases[target]) target = aliases[target];
  var module = `/app/commands/${target}.js`;
  if (fs.existsSync(module)) {
    module = require(module);
    if (module.meonly) {
      if (msg.author.id == 270035320894914560) {
      } else {
        var e = new RichEmbed();
        e.setTitle("Error!");
        e.setColor(0xff0000);
        e.setDescription(
          "You do not have permission to perform this action. ``IS_WYATT=FALSE``"
        );
        e.setThumbnail("https://wl-cyclone.glitch.me/img/X");
        e.setFooter(client.generateFooter());
        msg.channel.send(e);
        return false;
      }
    }
    if (module.permission) {
      if (module.permission == "MANAGE_SERVER")
        module.permission = "MANAGE_GUILD";
      if (!msg.member.hasPermission(module.permission, false, true, true)) {
        var e = new RichEmbed();
        e.setTitle("Error!");
        e.setColor(0xff0000);
        e.setDescription(
          "You do not have permission to perform this action. ``" +
            module.permission +
            "``"
        );
        e.setThumbnail("https://wl-cyclone.glitch.me/img/X");
        e.setFooter(client.generateFooter());
        msg.channel.send(e);
        return false;
      }
    }
    if (module.p) {
      if (msg.guild.available) {
        if (!msg.guild.me.hasPermission(module.p, false, true, true)) {
          var embed = new client.embed;
          embed.setTitle(`Error`);
          embed.setFooter(client.generateFooter());
          embed.setDescription(`To execute ${target}, I require permissions that I do not have.`);
          embed.setThumbnail(client.assets.X);
          var mp = `${msg.guild.me.permissions.missing(module.p)}`
          var rp = `${module.p}`;
          rp=rp.replace(/_/g, "   ");
          rp=rp.replace(/\[/g, "");
          rp=rp.replace(/\]/g, "");
          rp=rp.replace(/,/g, ", ");
          mp=mp.replace(/_/g, " ");
          mp=mp.replace(/\[/g, "");
          mp=mp.replace(/\]/g, "");
          mp=mp.replace(/,/g, ", ");
          embed.addField(`Missing Permissions`, mp, true);
          embed.addField(`Required Permissions`, rp, true);
          if (rp.includes("Send Messages")) {
            msg.author.send(embed);
          } else {
            msg.channel.send(embed);
          }
          return false;
        }
      }
    }
    if (msg.channel.topic && msg.channel.topic.includes("no-commands")) {
      if (msg.deletable()) msg.delete();
      return;
    }
    var args = msg.content.slice(target + prefix.length).split(" ");
    args.shift(); // remove the command
    if (msg.deletable) {
      msg.delete(); // delete the command, if it can
    }
    module.run(client, msg, args);
  }
};
