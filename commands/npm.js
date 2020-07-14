const got = require("got");

exports.run = async function(client, msg, args) {
  var q = args.join(" ");
  if (!q) return 1;
  var url = `https://registry.npmjs.org/-/v1/search?text=${q}&size=1`;
  var req = await got(url);
  console.log(req.body);
  var res = JSON.parse(req.body).objects[0];
  if (!res) {
    msg.channel.send(`I could not find a package by that name.`);
    return;
  }
  res=res.package;
  var e = new client.embed;
  e.setColor(0xFF0000);
  e.setThumbnail("https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/220px-Npm-logo.svg.png");
  e.setTitle(`${res.name} V${res.version}`);
  e.setDescription(res.description);
  e.setURL(res.links.npm);
  if (res.links.homepage || res.links.repository || res.links.bugs) {
    var links = "";
    if (res.links.homepage) {
      links = links + `[Homepage](${res.links.homepage})\n`;
    }
    if (res.links.repository) {
      links = links + `[Repository](${res.links.repository})\n`;
    }
    if (res.links.bugs) {
      links = links + `[Bugs](${res.links.bugs})`;
    }
    e.addField(`Links`, links, true);
  }
  if (res.keywords) e.addField(`Keywords`, res.keywords.concat(), true);
  if (res.publisher) e.setAuthor(res.publisher.username);
  if (res.author) e.addField(`Author`, res.author.name, true);
  if (res.date) {
    e.setFooter(client.generateFooter() + " | Last Updated:");
    e.setTimestamp(res.date.ts);
  } else {
    e.setFooter(client.generateFooter());
  };
  msg.channel.send(e);
};

exports.usage = "npm [package]";
exports.example = "npm discord.js"
exports.description = "Finds information on a NPM package."
exports.p = ["EMBED_LINKS", "SEND_MESSAGES"]