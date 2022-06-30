const fs = require('fs');
const readline = require('readline');

const TEMPLATE = {
  'URL_SERVER': {
    'message': 'Base URL for the FiveM server e.g. http://127.0.0.1:3501 (don\'t end with /)',
    'required': true,
  },
  'SERVER_NAME': {
    'message': 'The name of your FiveM server',
    'required': true,
  },
  'SERVER_LOGO': {
    'message': 'A logo for your FiveM server',
    'required': false,
  },
  'PERMISSION': {
    'message': 'Permission for the +status command',
    'required': true,
  },
  'BOT_TOKEN': {
    'message': 'Discord bot token',
    'required': true,
  },
  'CHANNEL_ID': {
    'message': 'Channel ID that will be used for updates to be pushed to',
    'required': true,
  },
  'MESSAGE_ID': {
    'message': 'Message ID of previous update to edit (not required)',
    'required': false,
    'default': null
  },
  'SUGGESTION_CHANNEL': {
    'message': 'Channel that will create suggestion embeds in',
    'required': true,
  },
  'BUG_CHANNEL': {
    'message': 'Channel that will recieve bug reports',
    'required': true
  },
  'BUG_LOG_CHANNEL': {
    'message': 'Channel that will log bug reports',
    'required': true,
  },
  'LOG_CHANNEL': {
    'message': 'Channel that will log status changes',
    'required': true,
  },
  'DEBUG': {
    'message': 'Disable/Enable debug logs (spammy)',
    'required': true
  },
  'WEBSITE_URL': {
    'message': 'Creates a link button for the status embed. Make sure you are using https://[website] or http://[website]',
    'required': false
  },
  'SHOW_PLAYERS': {
    'message': 'Choose to either hide or show the online players',
    'required': true
  },
  'RESTART_TIMES': {
    'message': 'Displays restart time of your server',
    'required': true
  }
  
};
const SAVE_FILE = './config.json';

function loadValue(key) {
  return new Promise((resolve, reject) => {
    const io = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    io.question(`Please enter a value for '${key}'${TEMPLATE[key].required ? '' : ` (Not required defaults to '${TEMPLATE[key].default}')`}\n  ${TEMPLATE[key].message}\n> `, (value) => {
      io.close();
      resolve(value);
    });
  })
}

exports.createValues = function(keys) {
  return new Promise((resolve,reject) => {
    var data = {};
    if (keys === undefined) {
      keys = Object.keys(TEMPLATE);
    }
    const loop = function(i) {
      if (i < keys.length) {
        loadValue(keys[i]).then((value) => {
          let realValue = value.trim();
          if (TEMPLATE[keys[i]].required) {
            if (realValue.length > 0) {
              data[keys[i]] = realValue;
              loop(i + 1);
            } else {
              console.log('Invalid input');
              loop(i);
            }
          } else {
            if (realValue.length > 0) {
              data[keys[i]] = realValue;
              loop(i+1);
            } else {
              data[keys[i]] = TEMPLATE[keys[i]].default;
              loop(i + 1);
            }
          }
        })
      } else {
        resolve(data);
      }
    }
    loop(0);
  })
}

exports.saveValues = function(values) {
  return new Promise((resolve, reject) => {
    fs.writeFile(SAVE_FILE, JSON.stringify(values),(err) => {
      if (err) return reject(err);
      return resolve(true);
    })
  })
}

exports.loadValues = function() {
  return new Promise((resolve, reject) => {
    fs.readFile(SAVE_FILE, (err, data) => {
      if (err) return reject(err);
      var json;
      try {
        json = JSON.parse(data);
      } catch(e) {
        console.log('There is a JSON error in your ./config.json file!');
        return reject(e);
      }
      let notFound = new Array();
      for (var key in TEMPLATE) {
        if (!json.hasOwnProperty(key)) {
          notFound.push(key);
        }
      }
      if (notFound.length === 0) {
        return resolve(json);
      } else {
        console.log('Found new configuration values and they have been added!');
        exports.createValues(notFound).then((data) => {
          for (var key in data) {
            json[key] = data[key];
          }
          exports.saveValues(json).then(() => {
            resolve(json);
          }).catch(reject);
        }).catch(reject);
      }
    })
  });
}
