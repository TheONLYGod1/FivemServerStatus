'use strict';

const Discord = require('discord.js');
// const fetch = require('node-fetch');
const fetchTimeout = require('fetch-timeout');
const { paddedFullWidth, errorWrap } = require('./utils.js');

const LOG_LEVELS = {
  'ERROR': 3,
  'INFO': 2,
  'DEBUG': 1,
  'SPAM': 0
}

// --- don't mess with this unless you know what you are doing... ---
const BOT_CONFIG = {
  'apiRequestMethod': 'sequential',
  'messageCacheMaxSize': 50,
  'messageCacheLifetime': 0,
  'messageSweepInterval': 0,
  'fetchAllMembers': false,
  'disableEveryone': true,
  'sync': false,
  'restWsBridgeTimeout': 5000,
  'restTimeOffset': 300,
  'disabledEvents': [
    'CHANNEL_PINS_UPDATE',
    'TYPING_START'
  ],
  'ws': {
    'large_threshold': 100,
    'compress': false
  }
}
// ---------------------------------------------------------------------
const USER_AGENT = `FSS bot ${require('./package.json').version} , Node ${process.version} (${process.platform}${process.arch})`;

exports.start = function(SETUP) {
  const URL_SERVER = SETUP.URL_SERVER;
  const SERVER_NAME = SETUP.SERVER_NAME;
  const SERVER_LOGO = SETUP.SERVER_LOGO;
  const EMBED_COLOR = SETUP.EMBED_COLOR;
  const RESTART_TIMES = SETUP.RESTART_TIMES;
  const PERMISSION = SETUP.PERMISSION;
  const URL_PLAYERS = new URL('/players.json', SETUP.URL_SERVER).toString();
  const URL_INFO = new URL('/info.json', SETUP.URL_SERVER).toString();
  const MAX_PLAYERS = 64;
  const TICK_MAX = 1 << 9; // max bits for TICK_N
  const FETCH_TIMEOUT = 2000;
  const FETCH_OPS = {
    'cache': 'no-cache',
    'method': 'GET',
    'headers': { 'User-Agent': USER_AGENT }
  };
  const LOG_LEVEL = SETUP.LOG_LEVEL !== undefined ? parseInt(SETUP.LOG_LEVEL) : LOG_LEVELS.INFO;
  const BOT_TOKEN = SETUP.BOT_TOKEN;
  const CHANNEL_ID = SETUP.CHANNEL_ID;
  const MESSAGE_ID = SETUP.MESSAGE_ID;
  const SUGGESTION_CHANNEL = SETUP.SUGGESTION_CHANNEL;
  const BUG_CHANNEL = SETUP.BUG_CHANNEL;
  const BUG_LOG_CHANNEL = SETUP.BUG_LOG_CHANNEL;
  const LOG_CHANNEL = SETUP.LOG_CHANNEL;
  const UPDATE_TIME = 10000; // in ms

  var TICK_N = 0;
  var MESSAGE;
  var LAST_COUNT;
  var STATUS;

  var loop_callbacks = []; // for testing whether loop is still running

  const log = function(level,message) {
    if (level >= LOG_LEVEL) console.log(`𓊈${level}𓊉 ${message}`);
  };

  const getPlayers = function() {
    return new Promise((resolve,reject) => {
      fetchTimeout(URL_PLAYERS, FETCH_TIMEOUT).then((res) => {
        res.json().then((players) => {
          resolve(players);
        }).catch(reject);
      }).catch(reject);
    })
  };

  const getVars = function() {
    return new Promise((resolve,reject) => {
      fetchTimeout(URL_INFO, FETCH_OPS, FETCH_TIMEOUT).then((res) => {
        res.json().then((info) => {
          resolve(info.vars);
        }).catch(reject);
      }).catch(reject);
    });
  };

  const bot = new Discord.Client(BOT_CONFIG);

  const sendOrUpdate = function(embed) {
    if (MESSAGE !== undefined) {
      MESSAGE.edit(embed).then(() => {
        log(LOG_LEVELS.DEBUG, '✅ Update success');
      }).catch((e) => {
        log(LOG_LEVELS.ERROR, `❌ Update failed\nError: ${e}`);
      })
    } else {
      let channel = bot.channels.cache.get(CHANNEL_ID);
      if (channel !== undefined) {
        channel.messages.fetch(MESSAGE_ID).then((message) => {
          MESSAGE = message;
          message.edit(embed).then(() => {
            log(LOG_LEVELS.SPAM, '✅ Update successful');
          }).catch((e) => {
            log(LOG_LEVELS.ERROR, `❌ Update failed\nError: ${e}`);
          });
        }).catch(() => {
          channel.send(embed).then((message) => {
            MESSAGE = message;
            log(LOG_LEVELS.INFO,`✅ Status message sent.\nPlease update your config file using this message ID 𓊈${message.id}𓊉`);
          }).catch(console.error);
        })
      } else {
        log(LOG_LEVELS.ERROR, '❌ Update channel not set');
      }
    }
  };
bot.on('ready', () => {
var checkMe = ['ADMINISTRATOR','CREATE_INSTANT_INVITE','KICK_MEMBERS','BAN_MEMBERS','MANAGE_GUILD','ADD_REACTIONS','VIEW_AUDIT_LOG','PRIORITY_SPEAKER' ,'VIEW_CHANNEL','SEND_MESSAGES','SEND_TTS_MESSAGES','MANAGE_MESSAGES','READ_MESSAGE_HISTORY','MENTION_EVERYONE','USE_EXTERNAL_EMOJIS' ,'VIEW_GUILD_INSIGHTS','CONNECT','SPEAK','MUTE_MEMBERS','DEAFEN_MEMBERS','MOVE_MEMBERS','USE_VAD','CHANGE_NICKNAME','MANAGE_NICKNAMES','MANAGE_ROLES','MANAGE_WEBHOOKS','MANAGE_EMOJIS','STREAM','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS']  
  if(!checkMe.includes(PERMISSION)) {

  console.log(`⚠ NOTICE: Your 'PERMISSION' variable (${PERMISSION}) is incorrect please, check the readme to find the list of permissions... exiting....`);
  process.exit(0);             
  }

})
  const UpdateEmbed = function() {
    let dot = TICK_N % 2 === 0 ? 'RP' : 'Roleplay';
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${SERVER_NAME} | Server Status`, SERVER_LOGO)
    .setColor(EMBED_COLOR)
    .setThumbnail(SERVER_LOGO)
    .setFooter(TICK_N % 2 === 0 ? `${SERVER_NAME}` : `${SERVER_NAME}`)
    .setTimestamp(new Date())
    .addField('\n\u200b\nServer Name', `\`\`\`${SERVER_NAME}\`\`\``,false)
    if (STATUS !== undefined)
    {
      embed.addField('📬 Server Notice:',`\`\`\`${STATUS}\`\`\`\n\u200b\n`);
      embed.setColor('#00f931')
    }
    return embed;
  };

  const offline = function() {
    log(LOG_LEVELS.SPAM, Array.from(arguments));
    if (LAST_COUNT !== null) log(LOG_LEVELS.INFO,`Server offline ${URL_SERVER} (${URL_PLAYERS} ${URL_INFO})`);
    let embed = UpdateEmbed()
    .setColor(0xff0000)
    .setThumbnail(SERVER_LOGO)
    .addFields(
      { name: "Server Status:",          value: "```❌ Offline```",    inline: true },
      { name: "Watching:",                value: "```--```",            inline: true },
      { name: "Online Players:",         value: "```--```\n\u200b\n",  inline: true },
      { name: "Server Restart Times:",   value: "```N/A```",           inline: true }
    )
    sendOrUpdate(embed);
    LAST_COUNT = null;
  };

  const updateMessage = function() {
    getVars().then((vars) => {
      getPlayers().then((players) => {
        if (players.length !== LAST_COUNT) log(LOG_LEVELS.INFO,`${players.length} players`);
        let queue = vars['Queue'];
        let embed = UpdateEmbed()
        .addFields(
          { name: "Server Status",            value: "```✅ Online```",                                                                                    inline: true },
          { name: "Watching",                  value: `\`\`\`${queue === 'Enabled' || queue === undefined ? '0' : queue.split(':')[1].trim()}\`\`\``,        inline: true },
          { name: "Online Players",           value: `\`\`\`${players.length}/${MAX_PLAYERS}\`\`\`\n\u200b\n`,                                              inline: true },
          { name: "Server Restart Times:",    value: `\`\`\`${RESTART_TIMES}\`\`\``,                                                                        inline: true }
          )
        .setThumbnail(SERVER_LOGO)
        if (players.length > 0) {
          
          const fieldCount = 3;
          const fields = new Array(fieldCount);
          fields.fill('');
         
          fields[0] = `**Players On:**\n`;
          for (var i=0; i < players.length; i++) {
            fields[(i+1)%fieldCount] += `${players[i].name.substr(0,12)} Ping: ${players[i].ping}ms\n`; // first 12 characters of players name
          }
          for (var i=0; i < fields.length; i++) {
            let field = fields[i];
            if (field.length > 0) embed.addField('\u200b', field);
          }

        }
        sendOrUpdate(embed);
        LAST_COUNT = players.length;
      }).catch(offline);
    }).catch(offline);
    TICK_N++;
    if (TICK_N >= TICK_MAX) {
      TICK_N = 0;
    }
    for (var i=0;i<loop_callbacks.length;i++) {
      let callback = loop_callbacks.pop(0);
      callback();
    }
  };

  bot.on('ready',() => {
    log(LOG_LEVELS.INFO,`
   /////////////////////////////////////////////////////
   /// ███╗░░██╗░█████╗░████████╗██╗░█████╗░███████╗ ///
   /// ████╗░██║██╔══██╗╚══██╔══╝██║██╔══██╗██╔════╝ ///
   /// ██╔██╗██║██║░░██║░░░██║░░░██║██║░░╚═╝█████╗░░ ///
   /// ██║╚████║██║░░██║░░░██║░░░██║██║░░██╗██╔══╝░░ ///
   /// ██║░╚███║╚█████╔╝░░░██║░░░██║╚█████╔╝███████╗ ///
   /// ╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚══════╝ ///
   /////////////////////////////////////////////////////
   /// When the bot connects to the server           ///
   /// successfully you may get an error saying it's ///
   /// offline once or twice. THIS IS NOT AN ERROR   ///
   /// WITH THE CODE! The server times out requests  ///
   /// sometimes and will produce this error.        ///
   /// Just ignore it!                               ///
   /////////////////////////////////////////////////////
   ➼ Bot has been started and will attempt to connect to the server...
    `)
    bot.user.setPresence({
      activity: {
          name: `${SERVER_NAME}`,
          type: "WATCHING"
      }, status: "online"
    })
  
    bot.setInterval(updateMessage, UPDATE_TIME);
  });

  function checkLoop() {
    return new Promise((resolve,reject) => {
      var resolved = false;
      let id = loop_callbacks.push(() => {
        if (!resolved) {
          resolved = true;
          resolve(true);
        } else {
          log(LOG_LEVELS.ERROR, 'Loop callback called after timeout');
          reject(null);
        }
      })
      setTimeout(() => {
        if (!resolved) {
          resolved = true;
          resolve(false);
        }
      },3000);
    })
  }

  bot.on('debug',(info) => {
    log(LOG_LEVELS.SPAM,info);
  })

  bot.on('error',(error,shard) => {
    log(LOG_LEVELS.ERROR,error);
  })

  bot.on('warn',(info) => {
    log(LOG_LEVELS.DEBUG,info);
  })

  bot.on('disconnect',(devent,shard) => {
    log(LOG_LEVELS.INFO,'Disconnected');
    checkLoop().then((running) => {
      log(LOG_LEVELS.INFO, `Loop still running: ${running}`);
    }).catch(console.error);
  })

  bot.on('reconnecting',(shard) => {
    log(LOG_LEVELS.INFO,'Reconnecting');
    checkLoop().then((running) => {
      log(LOG_LEVELS.INFO, `Loop still running: ${running}`);
    }).catch(console.error);
  })

  bot.on('resume',(replayed,shard) => {
    log(LOG_LEVELS.INFO, `Resuming (${replayed} events replayed)`);
    checkLoop().then((running) => {
      log(LOG_LEVELS.INFO, `Loop still running: ${running}`);
    }).catch(console.error);
  })

  bot.on('rateLimit',(info) => {
    log(LOG_LEVELS.INFO,`Rate limit hit ${info.timeDifference ? info.timeDifference : info.timeout ? info.timeout : 'Unknown timeout '}ms (${info.path} / ${info.requestLimit ? info.requestLimit : info.limit ? info.limit : 'Unkown limit'})`);
    if (info.path.startsWith(`/channels/${CHANNEL_ID}/messages/${MESSAGE_ID ? MESSAGE_ID : MESSAGE ? MESSAGE.id : ''}`)) bot.emit('restart');
    checkLoop().then((running) => {
      log(LOG_LEVELS.DEBUG,`Loop still running: ${running}`);
    }).catch(console.error);
  })
  bot.on('message', async function (msg) {
    
    if (msg.content === '+help') {
      if (msg.member.hasPermission(PERMISSION)) {
      let embed =  new Discord.MessageEmbed()
      .setAuthor(msg.member.nickname ? msg.member.nickname : msg.author.tag, msg.author.displayAvatarURL())
      .setColor(0x2894C2)
      .setTitle(`${SERVER_NAME} | Help`)
      .setDescription('+status <Message> - Adds a warning message to the server status embed\n+status clear - Clears the warning message\n+help - Displays the bots commands')
      .setTimestamp(new Date());
      msg.channel.send(embed)
    } else {
      let noPerms =  new Discord.MessageEmbed()
        .setAuthor(msg.member.nickname ? msg.member.nickname : msg.author.tag, msg.author.displayAvatarURL())
        .setColor(0x2894C2)
        .setTitle(`${SERVER_NAME} | Error`)
        .setDescription(`❌ You do not have the ${PERMISSION}, therefor you cannot run this command!`)
        .setTimestamp(new Date());
        msg.channel.send(noPerms)
    }
  } 
});
  bot.on('message', async function (msg) {
    if (msg.channel.id === '631992057417695272') {
        await msg.react(bot.emojis.cache.get('587057796936368128'));
        await msg.react(bot.emojis.cache.get('595353996626231326'));
    }
});

  bot.on('message',(message) => {
    if (!message.author.bot) {
      if (message.member) {
        
          if (message.content.startsWith('+status ')) {
            if (message.member.hasPermission(PERMISSION)) {
            let status = message.content.substr(7).trim();
            let embed =  new Discord.MessageEmbed()
            .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag, message.author.displayAvatarURL())
            .setColor(EMBED_COLOR)
            .setTitle('☑️ Updated status message')
            .setTimestamp(new Date());
            if (status === 'clear') {
              STATUS = undefined;
              embed.setDescription('Cleared status message');
            } else {
              STATUS = status;
              embed.setDescription(`New message:\n\`\`\`${STATUS}\`\`\``);
            }
            bot.channels.cache.get(LOG_CHANNEL).send(embed);
            return log(LOG_LEVELS.INFO, `🔘 ${message.author.username} updated status`);
          } else {
            let noPerms =  new Discord.MessageEmbed()
              .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag, message.author.displayAvatarURL())
              .setColor(0x2894C2)
              .setTitle(`${SERVER_NAME} | Error`)
              .setDescription(`❌ You do not have the ${PERMISSION}, therefor you cannot run this command!`)
              .setTimestamp(new Date());
              message.channel.send(noPerms)
          }
        } 
        if (message.channel.id === SUGGESTION_CHANNEL) {
          let embed = new Discord.MessageEmbed()
          .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag, message.author.displayAvatarURL())
          .setColor(0x2894C2)
          .setTitle('Suggestion')
          .setDescription(message.content)
          .setTimestamp(new Date());
          message.channel.send(embed).then((message) => {
            const sent = message;
            sent.react('👍').then(() => {
              sent.react('👎').then(() => {
                log(LOG_LEVELS.SPAM, 'Completed suggestion message');
              }).catch(console.error);
            }).catch(console.error);
          }).catch(console.error);
          return message.delete();
        }
        if (message.channel.id === BUG_CHANNEL) {
          let embedUser = new Discord.MessageEmbed()
          .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag, message.author.displayAvatarURL())
          .setColor(0x2894C2)
          .setTitle('Bug Report')
          .setDescription('Your report has been successfully sent to the staff team!')
          .setTimestamp(new Date());
          let embedStaff = new Discord.MessageEmbed()
          .setAuthor(message.member.nickname ? message.member.nickname : message.author.tag, message.author.displayAvatarURL())
          .setColor(0x2894C2)
          .setTitle('Bug Report')
          .setDescription(message.content)
          .setTimestamp(new Date());
          message.channel.send(embedUser).then(null).catch(console.error);
          bot.channels.cache.get(BUG_LOG_CHANNEL).send(embedStaff).then(null).catch(console.error);
          return message.delete();
        }
      }
    }
  });

  bot.login(BOT_TOKEN).then(null).catch(() => {
    log(LOG_LEVELS.ERROR, 'The token you provided is invalided. Please make sure you are using the correct one from https://discord.com/developers/applications!');
    console.error(e);
    process.exit(1);
  });

  return bot;
}
