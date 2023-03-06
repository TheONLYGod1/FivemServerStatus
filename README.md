## Basic documentation is located here [https://fivem.cloudless.space/](https://fivem.cloudless.space/)

### FiveM Server Status
[![](https://img.shields.io/github/forks/TheONLYGod1/FivemServerStatus?label=Fork&style=social)](https://github.com/TheONLYGod1/FivemServerStatus/fork)
[![](https://img.shields.io/badge/discord.js-v13.12.0-brightgreen)](https://github.com/TheONLYGod1/FivemServerStatus/)
[![](https://img.shields.io/node/v/bot)](https://github.com/TheONLYGod1/FivemServerStatus/)
[![](https://img.shields.io/maintenance/yes/2023)](https://github.com/TheONLYGod1/FivemServerStatus/)
[![](https://img.shields.io/github/issues/TheONLYGod1/FivemServerStatus)](https://github.com/TheONLYGod1/FivemServerStatus/)
[![](https://img.shields.io/github/license/TheONLYGod1/FivemServerStatus)](https://github.com/TheONLYGod1/FivemServerStatus/)
[![](https://img.shields.io/github/languages/count/TheONLYGod1/FivemServerStatus)](https://github.com/TheONLYGod1/FivemServerStatus/)
[![](https://img.shields.io/github/languages/top/TheONLYGod1/FivemServerStatus)](https://github.com/TheONLYGod1/FivemServerStatus/)

A custom discord bot providing functionality for interacting with FiveM & Discord servers.
- Updated & Edited by [TheONLYGod1](https://github.com/TheONLYGod1)
## Notice:
- If you recieve an error in console saying "`Error [DISALLOWED_INTENTS]: Privileged intent provided is not enabled or whitelisted....`"
    - Enable the intents shown in the image below found where you get your bot token..
    - ![intents](https://cdn.discordapp.com/attachments/779184628913274881/1003042560433979462/unknown.png)


## Need Help?
<kbd> [![](https://discordapp.com/api/guilds/617870704662020136/widget.png?style=banner2)](https://discord.gg/pAKE2YK)
## Notices:
- Please make sure you Google your errors before joining the support server. I don't have time to help you setup the bot. Google is your friend make use of it.... stack overflow is very handy!
- If you are unable to get the bot to query your server **please** make sure you check that the IP address and port for you server are correct in the config.json file before asking for support
    - Also make sure your firewall on your host isn't blocking inbound connections
- If you get an error in console saying `(node:121108) UnhandledPromiseRejectionWarning: TypeError: fields.flat is not a function` you'll need to update your Node.js version. I have provided a link-to that explains how to update your Node.js version [here](https://phoenixnap.com/kb/update-node-js-version)
- If you get an error in console saying `! Make sure you have the latest version of node.js and npm installed.` you'll need to make sure both your NPM & Node.js is on the latest version. I have provided a link-to that explains how to update your NPM version [here](https://docs.npmjs.com/try-the-latest-stable-version-of-npm) and Node.js version [here](https://phoenixnap.com/kb/update-node-js-version)
    
## Creating a Bot Application
1. Open https://discord.com/developers/applications and sign in
2. Click the button that says `'New Application'` in the top right hand corner of the page
3. Enter a name for your bot
4. In the menu on the left side of the page click `'Bot'` then click `'Add Bot'`
    - If you don't want random users to invite your bot, uncheck the feature that says `'Public Bot'` on the bot page
5. Your new bot's token will display under the name field and you can click `'Copy'` to copy the token to your clipboard

## Inviting a Bot
1. Open https://discord.com/developers/applications and sign in
2. In the menu on the left side of the page make sure you are on `'General Information'`
3. Locate the `'APPLICATION ID'` and click copy
4. With the ID you just copied insert it into the URL below where `'APPLICATIONID'` is; then open the link
    - https://discord.com/oauth2/authorize?client_id=APPLICATIONID&scope=bot&permissions=8


```yaml
   /////////////////////////////////////////////////////
   /// ███╗░░██╗░█████╗░████████╗██╗░█████╗░███████╗ ///
   /// ████╗░██║██╔══██╗╚══██╔══╝██║██╔══██╗██╔════╝ ///
   /// ██╔██╗██║██║░░██║░░░██║░░░██║██║░░╚═╝█████╗░░ ///
   /// ██║╚████║██║░░██║░░░██║░░░██║██║░░██╗██╔══╝░░ ///
   /// ██║░╚███║╚█████╔╝░░░██║░░░██║╚█████╔╝███████╗ ///
   /// ╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚══════╝ ///
   /////////////////////////////////////////////////////
   /// If your FiveM server is not using the default ///
   /// server port (30120) the bot WILL NOT be able  ///
   /// to query the server. You'll need to have the  ///
   /// FiveM Queue Script installed on your server.  ///
   /////////////////////////////////////////////////////
   /// If the bot isn't able to check your server    ///
   /// make sure you don't have player endpoints     ///
   /// set to be hidden in your server.cfg.          ///
   /// "Hide player endpoints in external log output"///
   /////////////////////////////////////////////////////
```
# FiveM Queue script is located [here](https://github.com/RoqueDEV/FivemServerStatus/tree/master/fivemqueue)
## Setup / Start
1. Download all of the files
2. Set enviroment variables as described below in a `config.json` file
3. Navigate to the directory where the bot files are located
    - `cd /path/to/bot/files`
4. Run `npm install` in your terminal
5. Run `npm start` in your terminal
6. Enjoy!

Variables | Description | Required?
------------ | ------------- | -------------
URL_SERVER | Base URL for the FiveM server e.g. http://127.0.0.1:3501 **(don't end with /)** | Yes
SERVER_NAME | The name of your FiveM server | Yes
SERVER_LOGO | A logo for your FiveM server | No
EMBED_COLOR | Color of the status embed | Yes
PERMISSION | Permission needed to set the server status `+status` | Yes
BOT_TOKEN | Discord bot token | Yes
CHANNEL_ID | Channel ID that will be used for updates to be pushed to | Yes
MESSAGE_ID | Message ID of previous update to edit | No 
SUGGESTION_CHANNEL | Channel that will create suggestion embeds in | Yes
BUG_CHANNEL | Channel that will recieve bug reports | Yes
BUG_LOG_CHANNEL | Channel that will log bug reports | Yes
LOG_CHANNEL | Channel that will log status changes | Yes
DEBUG | Shows debug logs (spammy in console) | Yes
WEBSITE_URL | Creates a link button for the status embed | No
RESTART_TIMES | Will display restart times for the server | Yes
SHOW_PLAYERS | Choose to either show or hide the online player list | Yes

## Example of the `config.json` file
```json    
{
    "URL_SERVER": "http://127.0.0.1:30120",
    "SERVER_NAME": "BaySide RP",
    "SERVER_LOGO": "https://cdn.discordapp.com/icons/820669620339998770/cdbc882432a90b72ee921f57643526fa.webp?size=128",
    "EMBED_COLOR": "#b434eb",
    "PERMISSION": "MANAGE_MESSAGES",
    "BOT_TOKEN": "[BOT TOKEN HERE]",
    "CHANNEL_ID": "617873518960574464",
    "MESSAGE_ID": "828635715121840178",
    "SUGGESTION_CHANNEL": "617873319609368669",
    "BUG_CHANNEL": "617873444238786617",
    "BUG_LOG_CHANNEL": "657070256925442058",
    "LOG_CHANNEL": "617873550648279051",
    "DEBUG": false,
    "WEBSITE_URL": "https://godsnetwork.live", 
    "RESTART_TIMES": "12am, 1pm, 3pm",
    "SHOW_PLAYERS": true
  } 
```
## List of permissions for the `PERMISSION` variable in the `config.json` file
Permission | Description
------------ | -------------
ADMINISTRATOR | Implicitly has all permissions, and bypasses all channel overwrites
CREATE_INSTANT_INVITE | Create invitations to the guild
KICK_MEMBERS | Allows kicking members
BAN_MEMBERS | Allows banning members
MANAGE_CHANNELS | Edit and reorder channels
MANAGE_GUILD | Edit the guild information, region, etc.
ADD_REACTIONS | Add new reactions to messages
VIEW_AUDIT_LOG | Allows for viewing of audit logs
PRIORITY_SPEAKER | Allows for using priority speaker in a voice channel
STREAM | Allows the user to go live
VIEW_CHANNEL | Allows guild members to view a channel, which includes reading messages in text channels
SEND_MESSAGES | Allows for sending messages in a channel
SEND_TTS_MESSAGES | Allows for sending of `/tts` messages
MANAGE_MESSAGES | Delete messages and reactions
EMBED_LINKS | Links posted will have a preview embedded
ATTACH_FILES | Allows for uploading images and files
READ_MESSAGE_HISTORY | View messages that were posted prior to opening Discord
MENTION_EVERYONE | Allows for using the `@everyone` tag to notify all users in a channel, and the `@here` tag to notify all online users in a channel
USE_EXTERNAL_EMOJIS | Use emojis from different guilds
VIEW_GUILD_INSIGHTS | Allows for viewing guild insights
CONNECT | Connect to a voice channel
SPEAK | Speak in a voice channel
MUTE_MEMBERS | Mute members across all voice channels
DEAFEN_MEMBERS | Deafen members across all voice channels
MOVE_MEMBERS | Move members between voice channels
USE_VAD | Use voice activity detection
CHANGE_NICKNAME | Allows for modification of own nickname
MANAGE_NICKNAMES | Change other members' nicknames
MANAGE_ROLES | Allows management and editing of roles
MANAGE_WEBHOOKS | Allows management and editing of webhooks
MANAGE_EMOJIS_AND_STICKERS | Allows management and editing of emojis and stickers
USE_APPLICATION_COMMANDS | Allows members to use application commands, including slash commands and context menu commands
MANAGE_THREADS | Allows for deleting and archiving threads, and viewing all private threads
CREATE_PUBLIC_THREADS | Allows for creating public and announcement threads	
CREATE_PRIVATE_THREADS | Allows for creating private threads	
SEND_MESSAGES_IN_THREADS | Allows for sending messages in threads	    
USE_EXTERNAL_STICKERS | Allows the usage of custom stickers from other servers	
MODERATE_MEMBERS | Allows for timing out users to prevent them from sending or reacting to messages in chat and threads, and from speaking in voice and stage channels

## Commands
Command | Description 
------------ | -------------
`+status <Message>` | Adds a warning message to the server status embed
`+status clear` | Clears the warning message
`+help` | Displays the bots commands
    
## Example Response
<kbd> ![Screenshot](https://cdn.discordapp.com/attachments/349738315731173376/988892484178436156/unknown.png)
    
## Credits
Name | URLS | Other
------------ | ------------- | -------------
Sky | https://github.com/TheONLYGod1 \| https://cloudless.space/ | [God's Groove](https://top.gg/bot/515645834684006400)
Roque | https://github.com/RoqueDEV | 
Douile | https://github.com/Douile | 
Drazero | https://github.com/draZer0 | 
Queue script | https://github.com/anderscripts/FiveM_Queue | 
