'use strict';

let assert = require('assert');
let Board = require('../board');
let Bot = require('../').Bot;

let settings = {
    timebank: '10000',
    time_per_move: '500',
    player_names: 'player1,player2',
    your_bot: 'player1',
    your_botid: 'a',
    field_columns: '3',
    field_rows: '3'
};

describe('Bot Test', function() {
    it('should be able to train a bot and save the result', function(done) {
        this.timeout(200000);
        let board = new Board(settings, 3);
        let bot = new Bot();
        bot.train(board);
        bot.save('trainedBot.json', () => {
            console.log('Number of states saved:', Object.keys(bot.states).length);
            bot.load('trainedBot.json');
            console.log('Number of states loaded:', Object.keys(bot.states).length);
        });
        done();
    });
});
