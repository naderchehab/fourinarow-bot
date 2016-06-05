'use strict';

let assert = require('assert');
let Board = require('../board');
let Bot = require('../bot')

let settings = {
    timebank: '10000',
    time_per_move: '500',
    player_names: 'player1,player2',
    your_bot: 'player1',
    your_botid: '1',
    field_columns: '7',
    field_rows: '6'
};

describe('Bot Test', function() {
    it('should be able to train a bot', function(done) {
        let field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0';

        let board = new Board(settings, field);
        let bot = new Bot();
        bot.train(board);
        done();
    });
});
