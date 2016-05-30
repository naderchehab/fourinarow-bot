'use strict';

let Bot = require('./bot');

let settings = {};
let bot = new Bot();
let field;

let commands = {
    settings: (data) => {
        settings[data[0]] = data[1];
    },
    action: () => {
        let column = bot.getMove(field);
        return 'place_disc ' + column;
    },
    update: (data) => {
        if (data[0] === 'game') {
            switch (data[1]) {
                case 'round':
                    //round = data[2];
                    break;
                case 'field':
                    field = data[2];
                    break;
                default:
                    break;
            }
        }
    }
};

module.exports = commands;
