const Discord = require("discord.js");

module.exports.run = async(client, message, args) => {

  var botIcon = "https://cdn.discordapp.com/attachments/703909905723031583/706892344334614599/Bee.png"

    if(!args[0]) {
    let helpEmbed = new Discord.MessageEmbed()
    .setTitle("**My Commands**")
    .setColor("#20C20E")
    .setDescription("Please notice, this is in development.")

    .addField(" Player List", "players")
    .addField(" Group/Role list", "groups")
    .addField(" See what group/role a user is in", "viewRole <player Username>")

    .addField(" Edit players roles", "editRole <player Username> <add/remove> <group/role>")
    .setFooter("© 2020 Freddie")
    .setThumbnail("https://cdn.worldvectorlogo.com/logos/mysql-5.svg")
    .setTimestamp()

    message.channel.send(helpEmbed);

    };

};


module.exports.help = {
  name : "help"
}