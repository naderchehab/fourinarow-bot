'use strict';

let _ = require('lodash');
let Board = require('./board');

class Bot {
    constructor() {
        Bot.numTrainingGames = 1000;
        Bot.tdStepSize = 0.8;
        Bot.explorationRatio = 0.4;
        this.states = [];
        this.previousState;
    }

    // TODO: adapt tic-tac-toe strategy below to fourinarow

    train(board) {
        for (let i = 0; i < Bot.numTrainingGames; i++) {
            this._playOneGame(board);
            board.clear();
        }

        console.log("Number of states:", Object.keys(this.states).length);
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
            colIndex = _.random(0, board.fieldColumns);
        }

        board.placeDisc(colIndex);
    }

    _recordState(board) {
        let currentState = board.getFieldAsString();
        this.states[currentState] = this.states[currentState] || {visits: 0, value: 0};

        let hasWinner = board.checkWin();

        if (hasWinner) {
            if (this.yourBotId === 1) {
                this.states[currentState].value = 100;
            }
            else {
                this.states[currentState].value = -100;
            }
        }

        // Temporal Difference (TD) Learning
        if (this.previousState) {
            this.states[this.previousState].visits++;
            this.states[this.previousState].value = this.states[this.previousState].value + (Bot.tdStepSize/this.states[this.previousState].visits) * (this.states[currentState].value - this.states[this.previousState].value);
        }

        if (hasWinner || board.getLegalMoves().length === 0) {
            board.gameEnded = true;
            this.previousState = undefined;
        }
        else {
            this.previousState = currentState;
        }
    }

    getMove(board, stateMap) {
        let legalMoves = board.getLegalMoves();
        let nextStates = [];

        legalMoves.forEach(move => {
            let tmpBoard = board.clone();
            tmpBoard.placeDisc(move);
            nextStates.push(tmpBoard.getFieldAsString());
        });

        let bestState;

        if (board.yourBotId === 1) {
            bestState = _.maxBy(nextStates, s => (stateMap[s] && stateMap[s].value) || 0);
        } else {
            bestState = _.minBy(nextStates, s => (stateMap[s] && stateMap[s].value) || 0);
        }

        if (!bestState) {
            return null;
        }

        let move = Board.getMoveFromStateDiff(bestState, board.field, board.fieldColumns);

        return move;
    }
}

module.exports = Bot;
