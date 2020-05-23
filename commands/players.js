const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const logIn = require('../config.json').SQLlogin;


module.exports.run = async(client, message, args) => {
  
  //SELECT username FROM luckperms_players;
  var con = mysql.createConnection({
    host: "34.89.36.75",
    user: "minecraftGame",
    password: "H}5S|)&Zvhos6aO?",
    database: "Minecraft"
  });

    
    
  let statsEmbed = new Discord.MessageEmbed()
  .setTitle("Player List:")
  .setFooter("© 2020 Freddie")
  .setTimestamp()

  con.connect(function(err) {
  
    if (err) throw err;
    // if connection is successful
    con.query("SELECT * FROM luckperms_players;", function (err, result, fields) {
      // if any error while executing above query, throw error
      if (err) throw err;
      // if there is no error, you have the result
      // iterate for all the rows in result
      Object.keys(result).forEach(function(key) {
        var row = result[key];
        statsEmbed.addField(row.uuid.toString(),row.username.toString());
  
      });
      message.channel.send(statsEmbed)
    });
    
  });


    
    
    

}