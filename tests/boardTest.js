'use strict';

let assert = require('assert');
let Board = require('../').Board;

let settings = {
    timebank: '10000',
    time_per_move: '500',
    player_names: 'player1,player2',
    your_bot: 'player1',
    your_botid: '1',
    field_columns: '7',
    field_rows: '6'
};

describe('Board Test', function() {
    it('should get legal moves from current board', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        let legalMoves = board.getLegalMoves();
        let correctLegalMoves = [0, 1, 2, 4, 5, 6];
        let arraysMatch = (legalMoves.length === correctLegalMoves.length) && legalMoves.every((element, index) => element === correctLegalMoves[index]);
        assert(arraysMatch);
        done();
    });

    it('should place disc for player', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
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

    it('should get the column from index', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
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
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let field2 =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,1,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board1 = new Board(settings, field1);
        let board2 = new Board(settings, field2);

        let column = Board.getMoveFromStateDiff(board1.field, board2.field, board1.fieldColumns);
        assert(column === 5);
        done();
    });

    it('should be able to determine whether a row has four in a row', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        assert(board._checkRows() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        board = new Board(settings, field);
        assert(board._checkRows() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,1,1,1,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        board = new Board(settings, field);
        assert(board._checkRows() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,1,1,1,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,1,1,1';

        board = new Board(settings, field);
        assert(board._checkRows() === true);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,1,1,1,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,1,1,2';

        board = new Board(settings, field);
        assert(board._checkRows() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,1,1,1,1,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,1,1,2';

        board = new Board(settings, field);
        assert(board._checkRows() === true);

        field =
            '1,1,1,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,1,1,0,1,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,1,1,2';

        board = new Board(settings, field);
        assert(board._checkRows() === true);

        field =
            '1,1,1,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,1,1,0,1,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,1,1,2';

        board = new Board(settings, field);
        assert(board._checkRows() === false);

        done();
    });

    it('should be able to determine whether a column has four in a row', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        assert(board._checkColumns() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        board = new Board(settings, field);
        assert(board._checkColumns() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,1;' +
            '0,0,0,1,0,0,1;' +
            '0,0,0,2,0,2,1;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkColumns() === true);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,1;' +
            '0,0,0,2,0,2,1;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkColumns() === false);

        field =
            '2,0,0,0,0,0,0;' +
            '2,0,0,2,0,0,0;' +
            '2,0,0,1,0,0,0;' +
            '2,0,0,1,0,0,1;' +
            '0,0,0,2,0,2,2;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkColumns() === true);

        field =
            '0,0,0,0,0,0,0;' +
            '2,0,0,2,0,0,0;' +
            '2,0,0,1,0,0,0;' +
            '2,0,0,1,0,0,1;' +
            '2,0,0,2,0,2,2;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkColumns() === true);

        field =
            '0,0,0,0,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '2,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,1;' +
            '2,0,0,1,0,2,2;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkColumns() === true);

        done();
    });

    it('should be able to determine whether a diagonal has four in a row', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        assert(board._checkDiaglonals() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '2,2,2,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        board = new Board(settings, field);
        assert(board._checkDiaglonals() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '2,2,2,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,1,0,0;' +
            '0,0,0,2,0,1,0;' +
            '0,0,0,1,0,1,0';

        board = new Board(settings, field);
        assert(board._checkDiaglonals() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '2,2,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,1,0,0;' +
            '0,0,0,2,0,1,0;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkDiaglonals() === true);

        field =
            '0,0,0,0,0,0,0;' +
            '2,2,2,2,0,0,0;' +
            '0,0,0,0,0,0,0;' +
            '0,0,0,1,1,0,0;' +
            '0,0,0,2,0,1,0;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkDiaglonals() === false);

        field =
            '0,0,0,0,0,0,0;' +
            '2,2,0,2,0,0,0;' +
            '1,0,0,0,0,0,0;' +
            '0,1,0,0,1,0,0;' +
            '0,0,1,2,0,0,0;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkDiaglonals() === true);

        field =
            '0,0,0,2,0,0,0;' +
            '2,2,0,1,2,0,0;' +
            '0,0,0,0,0,2,0;' +
            '0,1,0,0,1,0,2;' +
            '0,0,1,2,0,0,0;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board._checkDiaglonals() === true);

        done();
    });

    it('should be able to determine whether the board has a draw', function(done) {
        let field =
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,1,0,0,0;' +
            '0,0,0,2,0,2,0;' +
            '0,0,0,1,0,1,0';

        let board = new Board(settings, field);
        assert(board.checkDraw() === false);

        field =
            '1,1,1,1,1,1,0;' +
            '2,2,2,2,0,2,1;' +
            '0,0,0,1,0,1,2;' +
            '0,0,0,1,0,1,1;' +
            '0,0,0,2,0,2,2;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board.checkDraw() === false);

        field =
            '1,1,1,1,1,1,1;' +
            '2,2,2,2,0,2,1;' +
            '0,0,0,1,0,1,2;' +
            '0,0,0,1,0,1,1;' +
            '0,0,0,2,0,2,2;' +
            '0,0,0,1,0,1,1';

        board = new Board(settings, field);
        assert(board.checkDraw() === true);

        done();
    });
});
