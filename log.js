"use strict";

let fs = require('fs');

module.exports = function log() {
    for (let i = 0; i < arguments.length; i++) {
        let arg = arguments[i];
        if (typeof arg === 'object') {
            arg = JSON.stringify(arg);
        }
        fs.appendFileSync('bot.log', arg + '\n');
    }
};
