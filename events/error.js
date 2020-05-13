const {Client, RichEmbed} = require("discord.js");
const Discord = require("discord.js");
const Webhook = new Discord.WebhookClient(process.env.WC, process.env.WS);

exports.run = function(client, args) {
  var err = args[0];
  Webhook.send("```" + err + "```");
}

exports.error = function(err) {
  Webhook.send("```" + err + "```");
}