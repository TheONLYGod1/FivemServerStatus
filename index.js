/*
WRITTEN BY Douile & Roque
https://github.com/Douile/
https://github.com/RoqueDEV/

UPDATED BY Skylar
https://github.com/TheONLYGod1
https://top.gg/bot/515645834684006400
https://godsnetwork.live

-----------

Environment setup
Set environment variables as described below:
  URL_SERVER - base url for fiveM server e.g. http://127.0.0.1:3501
  BOT_TOKEN - Discord bot token
  CHANNEL_ID - channel id for updates to be pushed to
  MESSAGE_ID - message id of previous update to edit (not required)
  SUGGESTION_CHANNEL - channel to create suggestion embeds in
  BUG_CHANNEL - channel to recieve bug reports
  BUG_LOG_CHANNEL - channel to log bug reports
  LOG_CHANNEL - channel to log status changes
  EMBED_COLOR - color of the status embed
  PERMISSION - permission node that users need to run commands
  BOT_TOKEN - discord application token AKA bot token
  DEBUG - shows debug logs (spammy)
  WEBSITE_URL - creates a link button for the status embed
  RESTART_TIMES - displays what times the server restarts
*/

const setup = require('./setup.js');
const { start } = require('./bot.js');
const chalk = require('chalk');

const printValues = function(values, text) {
  console.log(text ? text : 'Current values:');
  for (var key in values) {
    console.log(`  ${key} = \x1b[32m'${values[key]}'\x1b[0m`);
  }
}

const startBot = function(values) {
  console.log(`${chalk.bgBlue("[INFO]")} ${chalk.blue("Starting bot... this may take a few seconds to start...")}`);
  var bot = start(values);
  bot.on('restart',() => {
    console.log('\nRestarting bot');
    bot.destroy();
    bot = start(values);
  })
  var shutdown = function() {
    console.log(`${chalk.bgRed(`[STATUS]`)} ${chalk.red('Shutting down')}`);
    let destructor = bot.destroy();
    if (destructor) {
      destructor.then(() => {
        process.exit(0);
      }).catch(console.error);
    } else {
      process.exit(0);
    }
  }
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

if (process.argv.includes('-c') || process.argv.includes('--config')) {
  setup.loadValues().then((values) => {
    printValues(values);
    process.exit(0);
  }).catch((error) => {
    console.log('Unable to load saved values, reconfiguring all saved values again');
    setup.createValues().then((values) => {
      setup.saveValues(values).then(() => {
        printValues(values, 'New values:');
        process.exit(0);
      }).catch(console.error);
    }).catch(console.error);
  })
} else {
  console.log(`${chalk.bold.bgYellow(`[LOAD]`)} ${chalk.bold.yellow('Attempting to load enviroment values...')}`);
  setup.loadValues().then((values) => {
    startBot(values);
  }).catch((error) => {
    console.error(error);
    setup.createValues().then((values) => {
      setup.saveValues(values).then(() => {
        startBot(values);
      }).catch(console.error);
    }).catch(console.error);
  })
}
