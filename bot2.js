// this is a bot running on Discord.JS V12.

const Discord = require("discord.js-light");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot2 logged in as ${client.user.tag}`);
  
  exports.client = client;
  
  exports.fetchUser = async function(id) {
    console.log(`Fetching a V12 User (${id})`);
    await client.users.fetch(id).then(user => {
      return user;
    });
  };

  exports.resolveUser = async function(u) {
    console.log(`Resolving a V12 User from ${u}.`);
    return client.users.resolve(u);
  }
});

client.login(process.env.TOKEN2);