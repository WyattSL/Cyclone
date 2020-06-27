const got = require("got");
const request = require("request")

async function searchGame(query, msg) {
  var q = query.replace(/ /g, "+");
  q=q.replace(/'/g, "%27");
  var u = `https://store.steampowered.com/search/suggest?term=${q}&f=games&cc=US&realm=1&l=english&v=8802085`
  var req = await got(u, {
    headers: {
      "Accept": "*/*",
      "Accept-Language": "en-US,en;q=0.5",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive",
      "Pragma": "no-cache",
      "Cache-Control": "no-cache"
    },
    throwHttpErrors: false
  });
  req.on('error', function(err) {
    msg.channel.send(`HTTP Error: ${err}`)
  })
  var res = req.body;
  var appid = res.split("data-ds-appid=\"")[1].split("\"")[0];
  return appid;
}

exports.run = async function(client, msg, args) {
  var type = args.shift();
  msg.channel.send(`Please wait a moment whilst I fetch that...`).then(async ms => {
    if (type == "lookup" || type == "user") {
      var vurl = args.join(" ");
      if (!vurl.startsWith("76")) {
      var url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API}&vanityurl=${args.join(" ")}`;
      var id;
      var req = await got(url);
      var d = JSON.parse(req.body).response;
      var e = d.success
      } else {
        var id = vurl;
        var e = -1;
      }
      if (e == 1 || e == -1) {
        if (e == 1) id=d.steamid;
        var url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API}&steamids=${id}`;
        var req = await got(url);
        var d = JSON.parse(req.body).response.players[0];
        var e = new client.embed;
        e.setTitle("Lookup Results");
        e.setAuthor(d.personaname, d.avatar, d.profileurl)
        e.setThumbnail(d.avatarfull);
        e.addField("Steam ID", d.steamid);
        if (!d.profilestate) {
          e.setDescription("This user has not setup their profile.");
        } else if (d.communityvisiblitystate < 3) {
          e.setDescription("This user's profile is not public.");
        } else if (d.realname) {
          e.setDescription(d.realname);
        }
        if (d.personastate > -1) {
          var state;
          switch (d.personastate) {
            case 0:
              state = "Offline"
              break;
            case 1:
              state = "Online"
              break;
            case 2:
              state = "Busy"
              break;
            case 3:
              state = "Away"
              break;
            case 4:
              state = "Snooze"
              break;
            case 5:
              state = "Looking to Trade"
              break;
            case 6:
              state = "Looking to Play"
              break;
            default:
              state = "Unknown"
          }
          if (d.personastateflags & 1024) {
            state = "Online in Big Picture Mode"
          } else if (d.personastateflags & 64) {
            state = "Online with a Steam Controller"
          } else if (d.personastateflags & 256) {
            state = "Online on the Steam Web Client"
          } else if (d.personastateflags & 512) {
            state = "Online on the Steam Mobile App"
          }
          e.addField("Status", state)
        }
        if (d.loccountrycode) {
          var loc = d.loccountrycode
          if (d.locstatecode) {
            loc = loc + ", " + d.locstatecode
          }
          e.addField("Location", loc)
        }
        if (d.gameextrainfo) {
          e.addField("Playing", d.gameextrainfo);
        }
        if (d.gameserverip) {
          e.addField("Current Server", d.gameserverip)
        }
        if (d.timecreated) {
          var da = new Date(d.timecreated * 1000);
          e.addField("Date Created", da);
        }
        if (d.lastlogoff) {
          var da = new Date(d.lastlogoff * 1000);
          e.addField("Last Online", da)
        }
        if (d.personastateflags == 4) {
          e.addField("Special", "This person has a golden flag, and is probably important.")
        }
        if (d.timecreated) {
          e.setFooter(`${client.generateFooter()} | Account Created: `);
          e.setTimestamp(new Date(d.timecreated*1000));
        } else {
          e.setFooter(`${client.generateFooter()}`)
        }
        ms.edit(e);
      } else if (e == 42) {
        ms.edit(`I was unable to find a user with that vanity url.`);
      } else {
        ms.edit(`API Error: [${e}] ${d.message}`);
      }
    } else if (type == "games" || type == "library") {
      var vurl = args[0];
      var url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${process.env.STEAM_API}&vanityurl=${vurl}`;
      var id;
      var e = new client.embed;
      e.setTitle(`${vurl}'s Games`);
      e.setFooter(client.generateFooter());
      e.setColor(0x000000);
      var req = await got(url);
      var d = JSON.parse(req.body).response;
      id = d.steamid;
        var url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API}&steamid=${id}&include_appinfo=true`
        var greq = await got(url);
        var d = JSON.parse(greq.body).response;
        var pages = Number(args[args.length-1]) || 1
        if (d && d.games) {
          var games = ""
          var glist = d.games;
          glist.sort(function(a, b){return b.playtime_forever - a.playtime_forever});
          var max;
          if (pages && pages <= 3) {
            max = pages*25
          } else {
            max = 25;
          }
          for (i=0;i<max;i++) {
            var g = glist[i];
            if (!g) break;
            if (Math.round(g.playtime_forever/60) > 0) {
              var rpt = Math.round((g.playtime_2weeks || 0)/60)
              e.addField(g.name, `${rpt}/${Math.round((g.playtime_forever || 0)/60)} Hrs`, true);
              if (i+1 == 25) {
                ms.edit(e);
                e = new client.embed;
                e.setColor(0x000000)
                e.setFooter(client.generateFooter());
              } else if (i+1 == 50) {
                msg.channel.send(e);
                e = new client.embed;
                e.setColor(0x000000)
                e.setFooter(client.generateFooter());
              } else if (i+1 == 75) {
                msg.channel.send(e);
                e = new client.embed;
                e.setColor(0x000000)
                e.setFooter(client.generateFooter());
              }
            }
          }
        }
    } else if (type == "game" || type == "store") {
      var query = args.join(" ");
      var id;
      var mode;
      if (Number(query)) {
        mode = 1
        id = Number(query);
      } else {
        mode = 2;
      }
      if (mode == 2) { // remember to do this; once I find out how to search the store
        id = await searchGame(query, msg);
      }
      var url = `https://store.steampowered.com/api/appdetails?appids=${id}`;
      var req = await got(url);
      var res = JSON.parse(req.body)[id];
      if (res.success) {
        var data = res.data;
        var embed = new client.embed;
        embed.setFooter(client.generateFooter());
        if (data.name) embed.setTitle(data.name);
        if (data.legal_notice) embed.addField(`Legal Notice`, data.legal_notice, false);
        if (data.short_description) embed.setDescription(data.short_description);
        if (data.supported_languages) {
          var lang = data.supported_languages;
          lang = lang.split("<br>")[0];
          lang = lang.replace(/<strong><\/strong>/g, ``);
          lang = lang.replace(/<strong>/g, ``);
          lang = lang.replace(/<\/strong>/g, ``);
          lang = lang.replace(/\*/g, ``);
          embed.addField(`Supported Languages`, lang, false);
        }
        if (data.categories) {
          var i;
          var cats = ""
          for (i=0;i<data.categories.length;i++) {
            if (i < data.categories.length-1) {
              cats = `${cats}${data.categories[i].description}, `;
            } else {
              cats = `${cats}${data.categories[i].description}.`;
            }
          }
          embed.addField(`Categories`, cats);
        }
        if (data.release_date && data.release_date.coming_soon) {
          var d = new Date(data.release_date.date);
          var f = `${client.formatDay(d.getDay())} ${client.formatMonth(d.getMonth())} ${client.formatOrdinal(d.getDate())}, ${d.getFullYear()}.`
          embed.addField(`Coming Soon`, f, true)
        } else if (data.release_date && data.release_date.date) {
          var d = new Date(data.release_date.date);
          var f = `${client.formatDay(d.getDay())} ${client.formatMonth(d.getMonth())} ${client.formatOrdinal(d.getDate())}, ${d.getFullYear()}.`
          embed.addField(`Released`, f, true);
        }
        if (data.genres) {
          var x;
          var gens = ""
          for (x=0;x<data.genres.length;x++) {
            if (x < data.genres.length-1) {
              gens = `${gens}${data.genres[x].description}, `;
            } else {
              gens = `${gens}${data.genres[x].description}.`;
            }
          }
          embed.addField(`Genres`, gens, true);
        }
        if (data.support_info) {
          var m;
          if (data.support_info.url) {
            m = `[Support URL](${data.support_info.url})`;
          }
          if (data.support_info.email) {
            if (m) {
              m = `${m}; ${data.support_info.email}`;
            } else {
              m = data.support_info.email;
            }
          };
          if (m) {
            embed.addField(`Support`, m, true);
          }
        }
        if (data.required_age) embed.addField(`Age Requirement`, data.required_age, true);
        if (data.price_overview) {
          if (data.price_overview.final_formatted == data.price_overview.initial_formatted) {
            embed.addField(`Price`, `${data.price_overview.final_formatted}`, true);
          } else {
            embed.addField(`Price`, `~~${data.price_overview.initial_formatted}~~ ${data.price_overview.final_formatted}`);
          }
        }
        var dev;
        if (!data.developers) {
          if (data.publishers.length == 1) {
            embed.setAuthor(data.publishers[0]);
          }
        } else if (data.developers.length == 1) {
          embed.setAuthor(data.developers[0]);
        } else if (data.developers.length > 1) {
          var i;
          var devs = data.developers.concat(", ");
          embed.addField(`Developers`, devs, true);
        }
        if (!data.publishers || data.publishers == data.developers) {
          // don't do shit
        } else if (data.publishers.length == 1 && data.publishers[0]) {
          embed.addField(`Publisher`, data.publishers[0], true)
        } else if (data.publishers.length > 1) {
          var devs = data.publishers.concat(", ");
          embed.addField(`Publishers`, devs, true);
        }
        if (data.screenshots && data.screenshots[0]) {
          var i;
          var shots = [];
          for (i=0;i<data.screenshots.length;i++) {
            //shots.push(data.screenshots[i].path_full);
            var url = data.screenshots[i].path_full;
            var re = await got(url);
            var buffer = re.body;
            shots.push(buffer);
          };
          embed.attachFiles(shots);
        }
        if (data.recommendations && data.recommendations.total) embed.addField(`Recommendations`, data.recommendations.total, true);
        embed.addField(`App ID`, id, true);
        embed.setURL(`https://store.steampowered.com/app/${id}`)
        ms.edit(embed);
      } else {
        var embed = new client.embed;
        embed.setTitle("Error");
        embed.setColor(0xFF0000);
        embed.setFooter(client.generateFooter());
        embed.setDescription(`Something went wrong whilst processing your request. Please ensure that you inputted the correct game ID, or try again with the Game ID. (ex: 4000)`);
        embed.addField(`Attempted ID`, `${id}`)
        embed.setThumbnail(client.assets.X);
        ms.edit(embed);
      }
    } else {
      var embed = new client.embed;
      embed.setTitle("Error");
      embed.setColor(0xFF0000);
      embed.setFooter(client.generateFooter());
      var x = "```";
      var prefix = client.config[msg.guild.id].prefix || "."
      embed.setDescription(`Parameter error. Please use ${x}${prefix}help steam${x} for usage information.`);
      embed.setThumbnail(client.assets.X);
      ms.edit(embed);
    }
  });
}

exports.usage = "steam <lookup/store> <steam64/vanityurl/gameid/gamename>";
exports.description = "Retreive information on a steam user.";
exports.example = "steam lookup Wyatt; steam store 4000"