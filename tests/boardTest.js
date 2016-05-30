'use strict';

let assert = require('assert');
let Board = require('../board.js');

describe('Board Test', function () {
    it('should get columns from field', function (done) {
        let settings = {
            timebank: '10000',
            time_per_move: '500',
            player_names: 'player1,player2',
            your_bot: 'player1',
            your_botid: '1',
            field_columns: '7',
            field_rows: '6'
        };
        let field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        let columns = board.getColumns();
        assert(columns[3][1] === 2);
        done();
    });

    it('should get legal moves from current board', function (done) {
        let settings = {
            timebank: '10000',
            time_per_move: '500',
            player_names: 'player1,player2',
            your_bot: 'player1',
            your_botid: '1',
            field_columns: '7',
            field_rows: '6'
        };
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        let legalMoves = board.getLegalMoves(board.getColumns());
        let correctLegalMoves = [0, 1, 2, 4, 5, 6];
        let arraysMatch = (legalMoves.length === correctLegalMoves.length) && legalMoves.every((element, index) => element === correctLegalMoves[index]);
        assert(arraysMatch);
        done();
    });
});
