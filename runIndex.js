const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const config = require("./config.json")
const Discord = require('discord.js');
var mysql = require('mysql');

const token = require('./config.json').token;
const SQLlogin = require('./config.json').SQLlogin;
const StaffRole = require('./config.json').StaffRole;

const active = new Map();

client.on("message", message => {
  if (message.member.roles.cache.has(StaffRole)){
    if(message.content.indexOf(config.prefix) !== 0) return;
    //if (message.deletable) message.delete({ timeout: 4000 });
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args, ops);
    } catch (err) {
      console.error("Non Command Entered!");
    }
  }

});
    var ops = {
      active: active
    }

    client.on("ready", async () => {
      console.log(`Logged in as ${client.user.tag}!`);
       //channelStats.send("Connecting to SQL server...").then(msg => (msg.delete({ timeout: 1000 })))
       var con = mysql.createConnection(SQLlogin);
         con.end();
      

      client.user.setActivity('Database', { url: 'https://twitch.tv/pokimane', type: 'WATCHING' });
      
  });
client.login(config.token)

