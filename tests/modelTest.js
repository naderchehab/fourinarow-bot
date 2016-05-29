'use strict';

let assert = require('assert');
let Model = require('../model.js');

describe('Model Test', function() {
    it('should get columns from field', function(done) {
        let settings = {
            "timebank": "10000",
            "time_per_move": "500",
            "player_names": "player1,player2",
            "your_bot": "player1",
            "your_botid": "1",
            "field_columns": "7",
            "field_rows": "6"
        };
        let field =
            "0,0,0,0,0,0,0;" +
            "0,0,0,0,0,0,0;" +
            "0,0,0,0,0,0,0;" +
            "0,0,0,1,0,0,0;" +
            "0,0,0,2,0,2,0;" +
            "0,0,0,1,0,1,0";

        let model = new Model(settings, field);
        let columns = model.getColumns();
        assert(columns[3][1] === 2);
        done();
    });

    it('should get current legal moves from model', function(done) {
        let settings = {
            "timebank": "10000",
            "time_per_move": "500",
            "player_names": "player1,player2",
            "your_bot": "player1",
            "your_botid": "1",
            "field_columns": "7",
            "field_rows": "6"
        };
        let field =
            "0,0,0,1,0,0,0;" +
            "0,0,0,2,0,0,0;" +
            "0,0,0,1,0,0,0;" +
            "0,0,0,1,0,0,0;" +
            "0,0,0,2,0,2,0;" +
            "0,0,0,1,0,1,0";

        let model = new Model(settings, field);
        let legalMoves = model.getLegalMoves(model.getColumns());
        let correctLegalMoves = [0, 1, 2, 4, 5, 6];
        let arraysMatch = (legalMoves.length == correctLegalMoves.length) && legalMoves.every((element, index) => element === correctLegalMoves[index]);
        assert(arraysMatch);
        done();
    });
});
