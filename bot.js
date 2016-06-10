'use strict';

let fs = require('fs');
let _ = require('lodash');
let Board = require('./board');

class Bot {
    constructor(options) {
        Bot.numTrainingGames = _.get(options, 'numTrainingGames') || 100000;
        Bot.tdStepSize = _.get(options, 'tdStepSize') || 0.8;
        Bot.explorationRatio = _.get(options, 'explorationRatio') || 0.4;
        this.states = {};
        this.previousState = undefined;
    }

    // TODO: adapt tic-tac-toe strategy below to fourinarow

    train(board, callback) {
        for (let i = 0; i < Bot.numTrainingGames; i++) {
            this._playOneGame(board);
        }
        if (callback) {
            callback();
        }
    }

    save(path, callback) {
        fs.writeFile(path, JSON.stringify(this.states), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('File saved.');
            return callback();
        });
    }

    load(path) {
        this.states = require('./' + path);
    }

    _playOneGame(board) {
        board.clear();

        while (board.gameEnded === false) {
            this._play(board);
            this._recordState(board);
            board.nextPlayer();
        }
    }

    _play(board) {
        let isExploration = Math.random() < Board.explorationRatio;
        let colIndex = this.getMove(board);

        if (!colIndex || isExploration) {
            colIndex = _.random(0, board.fieldColumns - 1);
        }

        board.placeDisc(colIndex);
    }

    _recordState(board) {
        let currentState = board.getFieldAsString();
        this.states[currentState] = this.states[currentState] || {
            visits: 0,
            value: 0
        };

        let hasWinner = board.checkWin();

        if (hasWinner) {
            if (this.yourBotId === 1) {
                this.states[currentState].value = 100;
            } else {
                this.states[currentState].value = -100;
            }
        }

        // Temporal Difference (TD) Learning
        if (this.previousState) {
            this.states[this.previousState].visits++;
            this.states[this.previousState].value = this.states[this.previousState].value + (Bot.tdStepSize / this.states[this.previousState].visits) * (this.states[currentState].value - this.states[this.previousState].value);
        }

        if (hasWinner || board.getLegalMoves().length === 0) {
            board.gameEnded = true;
            this.previousState = undefined;
        } else {
            this.previousState = currentState;
        }
    }

    getMove(board) {
        let legalMoves = board.getLegalMoves();
        let nextStates = [];

        legalMoves.forEach(move => {
            let tmpBoard = board.clone();
            tmpBoard.placeDisc(move);
            nextStates.push(tmpBoard.getFieldAsString());
        });

        let bestState;

        if (board.yourBotId === 1) {
            bestState = _.maxBy(nextStates, s => (this.states[s] && this.states[s].value));
        } else {
            bestState = _.minBy(nextStates, s => (this.states[s] && this.states[s].value));
        }

        if (!bestState) {
            return undefined;
        }

        let move = Board.getMoveFromStateDiff(Board.getFieldArray(bestState), board.field, board.fieldColumns);

        return move;
    }
}

module.exports = Bot;
