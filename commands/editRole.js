const Discord = require('discord.js');
const client = new Discord.Client();
var mysql = require('mysql');
uuid="";
var GroupFound = "no";
const logIn = require('../config.json').SQLlogin;
const HigherStaffRole = require('../config.json').HigherStaffRole;

//const databaseConnection = require('./databaseConnection');


module.exports.run = async(client, message, args) => {
  if (message.member.roles.cache.has(HigherStaffRole)){
    var PlayerRoles=""
    var GroupFound = "no";
    async function delay(delayInms) {
        return new Promise(resolve  => {
          setTimeout(() => {
            resolve(2);
          }, delayInms);
        });
    }
    
    if(!args[0] || !args[1] || !args[2]){
        let helpEmbed = new Discord.MessageEmbed()
        .setTitle("**Improper Use**")
        .addField("Usage", "editRole <player username> <add/remove> <group/roll>")
        .setFooter("© 2020 Freddie")
        .setTimestamp()
        .setColor("fc231c");
        
        
        message.channel.send(helpEmbed);
    
        }else{ 
        let output = new Discord.MessageEmbed()
            .setTitle(args[0].charAt(0).toUpperCase()+ args[0].slice(1)+"'s Roles")
            .setFooter("© 2020 Freddie")
            .setColor("2bb0ed")
            .setTimestamp();

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
                      if (args[1]=="add"){
                        con.connect(function(err) {
                          if (err) throw err;
                          con.query("SELECT * FROM luckperms_groups;", function (err, result, fields) {
                            if (err) throw err;
                            Object.keys(result).forEach(function(key) {
                              var row = result[key];
                              
                              if (row.name==(args[2].toLowerCase())){
                                GroupFound="yes";
                            };
                            });
                            con.end();
                          }); 
                        });




                        let delayres = await delay(350);
                        if (GroupFound=="yes"){
                          MaxID=0
                          var con = mysql.createConnection(logIn);
                          con.connect(function(err) {
                            if (err) throw err;
                            con.query("SELECT * FROM luckperms_user_permissions order by id;", function (err, result, fields) {
                              if (err) throw err;
                              Object.keys(result).forEach(function(key) {
                                var row = result[key];
                                MaxID=row.id;
                              });
                              con.end();
                            }); 
                          });
                          delayres = await delay(350);







                          var con = mysql.createConnection(logIn);
                          IsGroupAllredy="no"
                          con.connect(function(err) {
                            if (err) throw err;
                            con.query("SELECT * FROM luckperms_user_permissions WHERE uuid='"+uuid+"' AND permission LIKE 'group.%';", function (err, result, fields) {
                              if (err) throw err;
                              Object.keys(result).forEach(function(key) {
                                var row = result[key];
                                temp = row.permission.replace("group.", "");
                                temp= temp.charAt(0).toUpperCase() + temp.slice(1);
                                PlayerRoles=PlayerRoles+temp+", ";
                                if (row.permission==("group."+args[2].toLowerCase())){
                                  IsGroupAllredy="yes"
                                }
                              });
                              con.end();
                            }); 
                          });
                          delayres = await delay(350);





                          
                          if (IsGroupAllredy=="no"){
                          MaxID=MaxID+1;
                          group=("group."+args[2].toLowerCase());
                          var con = mysql.createConnection(logIn);
                          con.connect(function(err) {
                            if (err) throw err;
                            var sql = "INSERT INTO luckperms_user_permissions (id, uuid, permission, value, server, world, expiry, contexts) VALUES ('"+MaxID+"', '"+uuid+"', '"+group+"', '1', 'global', 'global', '0', '{}');";
                            con.query(sql, function (err, result) {
                              if (err) throw err;
                              console.log(result.affectedRows + " record(s) updated");
                              temp= args[2].charAt(0).toUpperCase() + args[2].slice(1);
                              PlayerRoles=PlayerRoles+temp;
                              let noPerms = new Discord.MessageEmbed()
                                .setColor("20C20E")
                                .setFooter(result.affectedRows + " record(s)")
                                .addField("Note: In order for it to take affect the player needs to re-log!","Given "+args[0]+" the role "+args[2])
                                .addField(args[0]+" now has:",PlayerRoles)
                                .setTitle("Success!")
                                .setFooter("© 2020 Freddie")
                                .setTimestamp();
                             message.channel.send(noPerms);
                            });
                          });
                            
                          }else{
                            let noPerms = new Discord.MessageEmbed()
                              .setColor("fc231c")
                              .setTitle("Error!")
                              .addField("Error ",args[0]+" is already in the " + args[2]+ " group")
                              .setFooter("© 2020 Freddie")
                              .setTimestamp();
                             message.channel.send(noPerms);
                          }

                        }else if(GroupFound=="no"){

                          let noPerms = new Discord.MessageEmbed()
                          .setColor("fc231c")
                          .setTitle("Error!")
                          .addField("Error ","The role/group "+args[2]+" was not found try using R!groups for a list")
                          .setFooter("© 2020 Freddie")
                          .setTimestamp();

                         message.channel.send(noPerms);
                        }



                      }else if(args[1]=="remove"){

                        var con = mysql.createConnection(logIn);
                        InGroup="no"
                          con.connect(function(err) {
                            if (err) throw err;
                            con.query("SELECT * FROM luckperms_user_permissions WHERE uuid='"+uuid+"' AND permission LIKE 'group.%';", function (err, result, fields) {
                              if (err) throw err;
                              Object.keys(result).forEach(function(key) {
                                var row = result[key];
                                temp = row.permission.replace("group.", "");
                                temp= temp.charAt(0).toUpperCase() + temp.slice(1);
                                PlayerRoles=PlayerRoles+temp+", ";
                                if (row.permission==("group."+args[2].toLowerCase())){
                                  InGroup="yes"
                                }
                              });
                              con.end();
                            }); 
                          });
                          delayres = await delay(350);
                          
                          if (InGroup=="yes"){
                            var con = mysql.createConnection(logIn);
                            con.connect(function(err) {
                              if (err) throw err;
                              var sql = "DELETE FROM luckperms_user_permissions WHERE permission = '"+("group."+args[2].toLowerCase())+"' AND uuid = '"+uuid+"'";
                              con.query(sql, function (err, result) {
                                if (err) throw err;
                                temp= args[2].charAt(0).toUpperCase() + args[2].slice(1);
                                let noPerms = new Discord.MessageEmbed()
                                .setColor("12ff26")
                                .setFooter("Number of records deleted: " + result.affectedRows)
                                .addField("Note: In order for it to take affect the player needs to re-log!","Taken the role of "+args[2]+" from "+args[0])
                                .addField(args[0]+" now has:",PlayerRoles.replace(temp+",", ""))
                                .setTitle("Success!")
                                .setFooter("© 2020 Freddie")
                                .setTimestamp();
                             message.channel.send(noPerms);
                              });
                            });

                          }else{
                            let noPerms = new Discord.MessageEmbed()
                              .setColor("fc231c")
                              .setTitle("Error!")
                              .addField("Error ", (args[0]+" isn't in the group "+args[2]))
                              .setFooter("© 2020 Freddie")
                              .setTimestamp();
                            message.channel.send(noPerms);
                          }
                        


                      }else{

                        let noPerms = new Discord.MessageEmbed()
                          .setColor("fc231c")
                          .setTitle("Error!")
                          .addField("Error ","You have to use **add** or **remove** as the second modifiers!")
                          .setFooter("© 2020 Freddie")
                          .setTimestamp();
                         message.channel.send(noPerms);
                      }
                

              }    
}
}else{
  let noPerms = new Discord.MessageEmbed()
        .setColor("6e0300")
        .setTitle("**Insufficient Permissions**")
        .setFooter("© 2020 Freddie")
        .setTimestamp();
  message.channel.send(noPerms);
}
}