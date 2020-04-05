const Discord = require("discord.js")
const {RichEmbed} = require("discord.js")
const client = new Discord.Client();
const fs = require("fs")

fs.readdir("./events/")