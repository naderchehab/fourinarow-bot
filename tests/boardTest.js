'use strict';

let assert = require('assert');
let _ = require('lodash');
let Board = require('../').Board;

let settings = {
    timebank: '10000',
    time_per_move: '500',
    player_names: 'player1,player2',
    your_bot: 'player1',
    your_botid: 'a',
    field_columns: '7',
    field_rows: '6'
};

describe('Board Test', function() {
    it('should get legal moves from current board', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        let legalMoves = board.getLegalMoves();
        let correctLegalMoves = [0, 1, 2, 4, 5, 6];
        let arraysMatch = (legalMoves.length === correctLegalMoves.length) && legalMoves.every((element, index) => element === correctLegalMoves[index]);
        assert(arraysMatch);
        done();
    });

    it('should place disc for player', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        let column = 2;

        board.placeDisc(column);
        assert(board.field[37] === board.yourBotId);

        board.placeDisc(column);
        assert(board.field[30] === board.yourBotId);

        board.placeDisc(column);
        assert(board.field[23] === board.yourBotId);

        column = 1;
        board.placeDisc(column);
        assert(board.field[36] === board.yourBotId);

        done();
    });

    it('should clear the board', function(done) {
        let field1 =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let field2 =
            'X,X,X,X,X,X,X;' +
            'X,X,X,X,X,X,X;' +
            'X,X,X,X,X,X,X;' +
            'X,X,X,X,X,X,X;' +
            'X,X,X,X,X,X,X;' +
            'X,X,X,X,X,X,X';

        let board1 = new Board(settings, 4, field1);
        let board2 = new Board(settings, 4, field2);
        board1.clear();
        assert(_.isEqual(board1.field, board2.field));
        done();
    });

    it('should get the column from index', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        let column;

        column = Board.getColumnFromIndex(41, board.fieldColumns);
        assert(column === 6, '41 must be 6, was ' + column);

        column = Board.getColumnFromIndex(40, board.fieldColumns);
        assert(column === 5, '40 must be 5, was ' + column);

        column = Board.getColumnFromIndex(39, board.fieldColumns);
        assert(column === 4, '39 must be 4, was ' + column);

        column = Board.getColumnFromIndex(38, board.fieldColumns);
        assert(column === 3, '38 must be 3, was ' + column);

        column = Board.getColumnFromIndex(37, board.fieldColumns);
        assert(column === 2, '37 must be 2, was ' + column);

        column = Board.getColumnFromIndex(36, board.fieldColumns);
        assert(column === 1, '36 must be 1, was ' + column);

        column = Board.getColumnFromIndex(35, board.fieldColumns);
        assert(column === 0, '35 must be 0, was ' + column);

        column = Board.getColumnFromIndex(34, board.fieldColumns);
        assert(column === 6, '34 must be 6, was ' + column);

        column = Board.getColumnFromIndex(33, board.fieldColumns);
        assert(column === 5, '33 must be 5, was ' + column);

        column = Board.getColumnFromIndex(32, board.fieldColumns);
        assert(column === 4, '32 must be 4, was ' + column);

        column = Board.getColumnFromIndex(2, board.fieldColumns);
        assert(column === 2, '2 must be 2, was ' + column);

        column = Board.getColumnFromIndex(1, board.fieldColumns);
        assert(column === 1, '1 must be 1, was ' + column);

        column = Board.getColumnFromIndex(0, board.fieldColumns);
        assert(column === 0, '0 must be 0, was ' + column);

        done();
    });

    it('should be able to get move from state diff', function(done) {
        let field1 =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let field2 =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,a,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board1 = new Board(settings, 4, field1);
        let board2 = new Board(settings, 4, field2);

        let column = Board.getMoveFromStateDiff(board1.field, board2.field, board1.fieldColumns);
        assert(column === 5);
        done();
    });

    it('should be able to determine whether a row has four in a row', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        assert(board._checkRows() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,a,a,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,a,a,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,a,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === true);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,a,a,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,a,a,b';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,a,a,a,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,a,a,b';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === true);

        field =
            'a,a,a,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,a,a,X,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,a,a,b';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === true);

        field =
            'a,a,a,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,a,a,X,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,a,a,b';

        board = new Board(settings, 4, field);
        assert(board._checkRows() === false);

        done();
    });

    it('should be able to determine whether a column has four in a row', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        assert(board._checkColumns() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        board = new Board(settings, 4, field);
        assert(board._checkColumns() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,a;' +
            'X,X,X,a,X,X,a;' +
            'X,X,X,b,X,b,a;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkColumns() === true);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,a;' +
            'X,X,X,b,X,b,a;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkColumns() === false);

        field =
            'b,X,X,X,X,X,X;' +
            'b,X,X,b,X,X,X;' +
            'b,X,X,a,X,X,X;' +
            'b,X,X,a,X,X,a;' +
            'X,X,X,b,X,b,b;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkColumns() === true);

        field =
            'X,X,X,X,X,X,X;' +
            'b,X,X,b,X,X,X;' +
            'b,X,X,a,X,X,X;' +
            'b,X,X,a,X,X,a;' +
            'b,X,X,b,X,b,b;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkColumns() === true);

        field =
            'X,X,X,X,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'b,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,a;' +
            'b,X,X,a,X,b,b;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkColumns() === true);

        done();
    });

    it('should be able to determine whether a diagonal has four in a row', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'b,b,b,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'b,b,b,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,a,X,X;' +
            'X,X,X,b,X,a,X;' +
            'X,X,X,a,X,a,X';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'b,b,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,a,X,X;' +
            'X,X,X,b,X,a,X;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === true);

        field =
            'X,X,X,X,X,X,X;' +
            'b,b,b,b,X,X,X;' +
            'X,X,X,X,X,X,X;' +
            'X,X,X,a,a,X,X;' +
            'X,X,X,b,X,a,X;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === false);

        field =
            'X,X,X,X,X,X,X;' +
            'b,b,X,b,X,X,X;' +
            'a,X,X,X,X,X,X;' +
            'X,a,X,X,a,X,X;' +
            'X,X,a,b,X,X,X;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === true);

        field =
            'X,X,X,b,X,X,X;' +
            'b,b,X,a,b,X,X;' +
            'X,X,X,X,X,b,X;' +
            'X,a,X,X,a,X,b;' +
            'X,X,a,b,X,X,X;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === true);

        field =
            'X,X,X,X,X,X,X;' +
            'b,b,b,b,X,X,X;' +
            'X,X,X,X,a,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,a,b,X,a,X;' +
            'X,a,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board._checkDiaglonals() === true);

        done();
    });

    it('should be able to determine whether the board has a draw', function(done) {
        let field =
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,a,X,X,X;' +
            'X,X,X,b,X,b,X;' +
            'X,X,X,a,X,a,X';

        let board = new Board(settings, 4, field);
        assert(board.checkDraw() === false);

        field =
            'a,a,a,a,a,a,X;' +
            'b,b,b,b,X,b,a;' +
            'X,X,X,a,X,a,b;' +
            'X,X,X,a,X,a,a;' +
            'X,X,X,b,X,b,b;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board.checkDraw() === false);

        field =
            'a,a,a,a,a,a,a;' +
            'b,b,b,b,X,b,a;' +
            'X,X,X,a,X,a,b;' +
            'X,X,X,a,X,a,a;' +
            'X,X,X,b,X,b,b;' +
            'X,X,X,a,X,a,a';

        board = new Board(settings, 4, field);
        assert(board.checkDraw() === true);

        done();
    });
});
