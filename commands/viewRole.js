const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
const logIn = require('../config.json').SQLlogin;
uuid="";
//const databaseConnection = require('./databaseConnection');


module.exports.run = async(client, message, args) => {

    async function delay(delayInms) {
        return new Promise(resolve  => {
          setTimeout(() => {
            resolve(2);
          }, delayInms);
        });
    } 
    
    if(!args[0]) {
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("**Inpropper Use**")
        .setColor("#20C20E")
        .addField("Usage", "viewRole <player username>")
        .setFooter("© 2020 Freddie")
        .setColor("fc231c")
        .setTimestamp()
        
        message.channel.send(helpEmbed);
    
        }else{ 
        let output = new Discord.MessageEmbed()
            .setTitle(args[0].charAt(0).toUpperCase()+ args[0].slice(1)+"'s Role(s)")
            .setFooter("© 2020 Freddie")
            .setColor("2bb0ed")
            .setTimestamp()

            var con = mysql.createConnection(logIn);

              con.connect(function(err) {
                uuid="error";
                   if (err) throw err;
                    con.query("SELECT * FROM luckperms_players WHERE username='"+args[0]+"';", function (err, result, fields) {
                  // if any error while executing above query, throw error
                    if (err) throw err;
                  // if there is no error, you have the result
                  // iterate for all the rows in result
                        Object.keys(result).forEach(function(key) {
                            var row = result[key];
                            uuid = row.uuid;
                            con.end();
                            
                        });
                    });
                });
                let delayres = await delay(350);
                var con = mysql.createConnection(logIn);

                if (uuid.length < 20){ //checks if the player has been on the server before
                    message.channel.send("It looks like "+args[0]+" has never been on our network!");
                }else{
                    
                    //if player has been on the server check there roll
                    con.connect(function(err) {
                           if (err) throw err;
                            con.query("SELECT * FROM luckperms_user_permissions WHERE uuid='"+uuid+"' AND permission LIKE 'group.%';", function (err, result, fields) {
                          // if any error while executing above query, throw error
                            if (err) throw err;
                          // if there is no error, you have the result
                          // iterate for all the rows in result
                                Object.keys(result).forEach(function(key) {
                                    var row = result[key];
                                    
                                    temp = row.permission.replace("group.", "");
                                    temp= temp.charAt(0).toUpperCase() + temp.slice(1);
                                    output.addField("Roles ",temp.toString());
                                
                                });
                                con.end();});
                        });
                        let delayres = await delay(350);
                        message.channel.send(output)
                }
  
    

}
}