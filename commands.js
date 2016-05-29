"use strict";

let log = require('./log');
let board = require('./board');

let settings = {};
let round;
let field;

let commands = {
    settings: (data) => {
        settings[data[0]] = data[1];
    },
    action: (data) => {
        let legalMoves = board.getLegalMoves(field);
        return 'place_disc 0';
    },
    update: (data) => {
        if (data[0] === 'game') {
            switch (data[1]) {
                case 'round':
                    round = data[2];
                    break;
                case 'field':
                    field = data[2];
                    break;
            }
        }
    }
};

module.exports = commands;
