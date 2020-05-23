# LuckPerms-Discord-Bot
LuckPerms-Discord-Bot

Requires:
•	MySQL 5.7 database - https://dev.mysql.com/downloads/mysql/5.7.html

•	LuckPerms -https://www.spigotmc.org/resources/luckperms.28140/


Install:
Download the files on the GitHub page put them into a directory.
Make sure You have npm and node.JS installed - https://www.npmjs.com/get-npm

Open up a command prompt in the directory you have stored the LuckPerms-Discord-Bot files then type npm -v you should get the response of a number like 6.14.4.


Next we need to instal dependencies.

Run the commands:

npm install discord.js

npm install mysql

npm install fs


Now open the file config.jason you need to add your information:

StaffRole can use viewRole, groups and players.

HigherStaffRole can use all of those roles + editRole

Note( HigherStaff will also need the Staff role to use the bot)

{
{
    "token": "<enter your discord bot token you can find out how to get one here - https://www.writebots.com/discord-bot-token/>",

    "prefix": "the command you use to summon your bot i.e. R! orR?",

    "StaffRole" : "the role id of staff",
    "HigherStaffRole" : "the roll id of staff you want to be-able to edit players roles",

    "SQLlogin" : {

        "host": "database address",
        "user": "database username",
        "password": "password",
        "database": "database name"
    }
}
}

Once you have done that run the command – 

npm start

And your bot is online!!


You can also use a process manager like pm2 instead of npm:

npm install pm2 -g

Then run:

Pm2 start runIndex.js –name “LuckPermsBot”

Now its online! To stop it run:

pm2 stop LuckPermsBot

And to stat it again run:

pm2 start LuckPermsBot



 

