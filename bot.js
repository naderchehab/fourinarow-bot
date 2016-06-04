'use strict';

let _ = require('lodash');
let Board = require('./board');

class Bot {
    constructor() {
        Bot.numTrainingGames = 1000;
        this.states = [];
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
        let isExploration = Math.random() < explorationRatio;
        let cellNumber = this.getMove(board);

        if (!cellNumber || isExploration) {
            cellNumber = TicTacToe.RandomStrategy.getMove(board);
        }

        board.markCell(cellNumber);
    }

    _recordState(board) {
        let currentState = board.getFieldAsString();
        this.states[currentState] = this.states[currentState] || {visits: 0, value: 0};

        if (board.checkWin()) {
            if (currentPlayer === "x") {
                states[currentState].value = 100;
            }
            else {
                states[currentState].value = -100;
            }
        }

        // Temporal Difference (TD) Learning
        if (previousState) {
            states[previousState].visits++;
            states[previousState].value = states[previousState].value + (STEP_SIZE/states[previousState].visits) * (states[currentState].value - states[previousState].value);
        }

        if (board.getLegalMoves().length === 0) {
            board.set("gameEnded", true);
            previousState = undefined;
        }
        else {
            previousState = currentState;
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
