'use strict';

let fs = require('fs');
let path = require('path');
let _ = require('lodash');
let Board = require('./board');

let appDir = path.dirname(require.main.filename);

class Bot {
    constructor(options) {
        Bot.numTrainingGames = _.get(options, 'numTrainingGames') || 100000;
        Bot.tdStepSize = _.get(options, 'tdStepSize') || 0.8;
        Bot.explorationRatio = _.get(options, 'explorationRatio') || 0.4;
        this.states = {};
        this.previousState = undefined;
    }

    train(board, callback) {
        this.states = {};
        for (let i = 0; i < Bot.numTrainingGames; i++) {
            this._playOneGame(board);
        }
        if (callback) {
            callback();
        }
    }

    save(p, callback) {
        fs.writeFile(p, JSON.stringify(this.states), (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('File saved.');
            return callback();
        });
    }

    load(p) {
        this.states = require(path.join(appDir, p));
    }

    getMove(board) {
        let legalMoves = board.getLegalMoves();
        let nextStates = [];

        legalMoves.forEach(move => {
            let tmpBoard = board.clone();
            tmpBoard.placeDisc(move);
            nextStates.push(tmpBoard.getFieldAsString());
            //console.log(tmpBoard.getFieldAsString(), this.states[tmpBoard.getFieldAsString()]);
        });

        let bestState;

        if (board.yourBotId === board.player1Id) {
            bestState = _.maxBy(nextStates, s => this.states[s] && this.states[s].value);
        } else {
            bestState = _.minBy(nextStates, s => this.states[s] && this.states[s].value);
        }

        if (!bestState) {
            return undefined;
        }

        let move = Board.getMoveFromStateDiff(Board.getFieldArray(bestState), board.field, board.fieldColumns);
        return move;
    }

    _playOneGame(board) {
        board.clear();

        while (board.gameEnded === false) {
            this._play(board);
            this._recordState(board);
            board.nextPlayer();
        }
        //console.log(this.states);
    }

    _play(board) {
        let isExploration = Math.random() < Bot.explorationRatio;
        let colIndex = this.getMove(board);

        if (!colIndex || isExploration) {
            colIndex = _.random(0, board.fieldColumns - 1);
        }

        board.placeDisc(colIndex);
    }

    _recordState(board) {
        let currentState = board.getFieldAsString();
        this.states[currentState] = this.states[currentState] || {
            visits: 1,
            value: 0
        };

        let hasWinner = board.checkWin();

        if (hasWinner) {
            if (board.yourBotId === this.player1Id) {
                this.states[currentState].value = 100;
            } else {
                this.states[currentState].value = -100;
            }
        }

        // Temporal Difference (TD) Learning
        if (this.previousState) {
            this.states[this.previousState].visits++;
            this.states[this.previousState].value = this.states[this.previousState].value + (Bot.tdStepSize / this.states[this.previousState].visits) * (this.states[currentState].value - this.states[this.previousState].value);
            /*if (this.previousState === 'A000102102' && this.states[this.previousState].visits < 20) {
                console.log('AAAAAAAAA state:', this.previousState, 'value:', this.states[this.previousState].value, 'visits:', this.states[this.previousState].visits);
            }

            if (this.previousState === 'A200100102' && this.states[this.previousState].visits < 20) {
                console.log('BBB state:', this.previousState, 'value:', this.states[this.previousState].value, 'visits:', this.states[this.previousState].visits);
            }*/
        }

        if (hasWinner || board.checkDraw() === true) {
            board.gameEnded = true;
            this.previousState = undefined;
        } else {
            this.previousState = currentState;
        }
    }
}

module.exports = Bot;
