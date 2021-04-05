# FiveM Server Status

A custom discord bot providing functionality for interacting with FiveM & Discord servers.
- Updated to DJSv12 by [Skylar](https://github.com/TheONLYGod1)
## Need Help?
[![](https://discordapp.com/api/guilds/617870704662020136/widget.png?style=banner2)](https://discord.gg/pAKE2YK)
## Requirements:

- Included fivemqueue
- I have edited the source code of https://github.com/anderscripts/FiveM_Queue and added that it will change the queue count in the    variables so it will update accurately.

## Creating a Bot Application
1. Open https://discord.com/developers/applications and sign in
2. Click the button that says `'New Application'` in the top right hand corner of the page
3. Enter a name for your bot
4. In the menu on the left side of the page click `'Bot'` then click `'Add Bot`'
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
LOG_LEVEL | Number __0-4__ specifying level of logs *4 = No Logs* | Yes
BOT_TOKEN | Discord bot token | Yes
CHANNEL_ID | Channel ID that will be used for updates to be pushed to | Yes
MESSAGE_ID | Message ID of previous update to edit (not required) | No 
SUGGESTION_CHANNEL | Channel that will create suggestion embeds in | Yes
BUG_CHANNEL | Channel that will recieve bug reports | Yes
BUG_LOG_CHANNEL | Channel that will log bug reports | Yes
LOG_CHANNEL | Channel that will log status changes | Yes

## Running
1. `npm i`
2. `npm start` or `node ./index.js`


## Commands
1. `+status <Message>` - Adds a warning message to the server status embed
2. `+status clear` - Clears the warning message
3. `+help` - Displays the bots commands
  
![Screenshot](https://media.discordapp.net/attachments/424886239410388992/625739298846801936/unknown.png)

## Credits
- Skylar - https://github.com/TheONLYGod1
    - [![Discord Bots](https://top.gg/api/widget/status/515645834684006400.svg)](https://top.gg/bot/515645834684006400)
    - https://godsnetwork.live
- Roque - https://github.com/RoqueDEV
- Douile - https://github.com/Douile
- drazero - https://github.com/draZer0
- Queue script - https://github.com/anderscripts/FiveM_Queue
