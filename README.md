# FiveM Server Status

A custom discord bot providing functionality for interacting with FiveM & Discord servers.
- Updated & Edited by [Skylar](https://github.com/TheONLYGod1)
## Need Help?
[![](https://discordapp.com/api/guilds/617870704662020136/widget.png?style=banner2)](https://discord.gg/pAKE2YK)
## Requirements:

- Included fivemqueue
- I have edited the source code of https://github.com/anderscripts/FiveM_Queue and added that it will change the queue count in the    variables so it will update accurately.

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
4. With the ID you just copied insert it into the URL below where `'APPLICATIONID'` is then open the link
    - https://discord.com/oauth2/authorize?client_id=APPLICATIONID&scope=bot&permissions=8


## Setup

1. Add the included fivemqueue to your server resources
2. Start the fivemqueue in your server.cfg
3. Set enviroment variables as described below

Variables | Description | Required?
------------ | ------------- | -------------
URL_SERVER | Base URL for the FiveM server e.g. http://127.0.0.1:3501 **(don't end with /)** | Yes
SERVER_NAME | The name of your FiveM server | Yes
SERVER_LOGO | A logo for your FiveM server | No
PERMISSION | Permission needed to set the server status `+status` | Yes
LOG_LEVEL | Number __0-4__ specifying level of logs *4 = No Logs* | Yes
BOT_TOKEN | Discord bot token | Yes
CHANNEL_ID | Channel ID that will be used for updates to be pushed to | Yes
MESSAGE_ID | Message ID of previous update to edit | No 
SUGGESTION_CHANNEL | Channel that will create suggestion embeds in | Yes
BUG_CHANNEL | Channel that will recieve bug reports | Yes
BUG_LOG_CHANNEL | Channel that will log bug reports | Yes
LOG_CHANNEL | Channel that will log status changes | Yes
##### Example of the config.json file
```json    
{
    "URL_SERVER": "http://127.0.0.1:30120",
    "SERVER_NAME": "BaySide RP",
    "SERVER_LOGO": "https://cdn.discordapp.com/icons/820669620339998770/cdbc882432a90b72ee921f57643526fa.webp?size=128",
    "LOG_LEVEL": "2",
    "PERMISSION": "MANAGE_MESSAGES",
    "BOT_TOKEN": "[BOT TOKEN HERE]",
    "CHANNEL_ID": "617873518960574464",
    "MESSAGE_ID": "828635715121840178",
    "SUGGESTION_CHANNEL": "617873319609368669",
    "BUG_CHANNEL": "617873444238786617",
    "BUG_LOG_CHANNEL": "657070256925442058",
    "LOG_CHANNEL": "617873550648279051"
  } 
```

## List of permissions for the `PERMISSION` variables
Permission | Description
------------ | -------------
ADMINISTRATOR | Implicitly has all permissions, and bypasses all channel overwrites
CREATE_INSTANT_INVITE | Create invitations to the guild
KICK_MEMBERS | N/A
BAN_MEMBERS | N/A
MANAGE_CHANNELS | Edit and reorder channels)
MANAGE_GUILD | Edit the guild information, region, etc.
ADD_REACTIONS | Add new reactions to messages
VIEW_AUDIT_LOG | N/A
PRIORITY_SPEAKER | N/A
STREAM | N/A
VIEW_CHANNEL | N/A
SEND_MESSAGES | N/A
SEND_TTS_MESSAGES | N/A
MANAGE_MESSAGES | Delete messages and reactions
EMBED_LINKS | Links posted will have a preview embedded
ATTACH_FILES | N/A
READ_MESSAGE_HISTORY | View messages that were posted prior to opening Discord
MENTION_EVERYONE | N/A
USE_EXTERNAL_EMOJIS | Use emojis from different guilds
VIEW_GUILD_INSIGHTS | N/A
CONNECT | Connect to a voice channel
SPEAK | Speak in a voice channel
MUTE_MEMBERS | Mute members across all voice channels
DEAFEN_MEMBERS | Deafen members across all voice channels
MOVE_MEMBERS | Move members between voice channels
USE_VAD | Use voice activity detection
CHANGE_NICKNAME | N/A
MANAGE_NICKNAMES | Change other members' nicknames
MANAGE_ROLES | N/A
MANAGE_WEBHOOKS | N/A
MANAGE_EMOJIS | N/A

## Running
1. `npm i` or `npm install`
2. `npm start` or `node ./index.js`


## Commands
1. `+status <Message>` - Adds a warning message to the server status embed
2. `+status clear` - Clears the warning message
3. `+help` - Displays the bots commands
  
![Screenshot](https://godsnetwork.live/apis/fivem/img/ythv9.png)

## Credits
- Skylar
    - https://github.com/TheONLYGod1
    - [![Discord Bots](https://top.gg/api/widget/status/515645834684006400.svg)](https://top.gg/bot/515645834684006400)
    - https://godsnetwork.live
- Roque - https://github.com/RoqueDEV
- Douile - https://github.com/Douile
- drazero - https://github.com/draZer0
- Queue script - https://github.com/anderscripts/FiveM_Queue
