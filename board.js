'use strict';

let _ = require('lodash');

class Board {
    constructor(settings, field) {
        this.timebank = settings.timebank;
        this.timePerMove = parseInt(settings.time_per_move, 10);
        this.playerNames = settings.player_names;
        this.yourBot = settings.your_bot;
        this.yourBotId = parseInt(settings.your_botid, 10);
        this.fieldColumns = parseInt(settings.field_columns, 10);
        this.fieldRows = parseInt(settings.field_rows, 10);
        this.field = Board.getFieldArray(field);
        this.gameEnded = false;
    }

    static getFieldArray(field) {
        return field.split(/[,;]+/g).map(char => parseInt(char, 10));
    }

    static getMoveFromStateDiff(state1, state2, fieldColumns) {
        let retValue;
        for (let i = 0; i < state1.length; i++) {
            let diff = state2[i] - state1[i];
            if (diff !== 0) {
                retValue = Board.getColumnFromIndex(i, fieldColumns);
                break;
            }
        }
        return retValue;
    }

    static getColumnFromIndex(index, fieldColumns) {
        return Math.round(((index / fieldColumns) % 1) * fieldColumns);
    }

    static arrayHasFourInARow(arr) {
        let counter = 1;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === arr[i + 1]) {
                counter++;
            } else {
                counter = 1;
            }
            if (counter === 4) {
                return true;
            }
        }
        return false;
    }

    clear() {
        this.field = _.times(this.fieldColumns * this.fieldRows, _.constant(0));
    }

    getFieldAsString() {
        return 'A' + this.field.join('');
    }

    clone() {
        return new Board(this.settings, this.getFieldAsString());
    }

    getLegalMoves() {
        let legalColumns = [];
        for (let i = 0; i < this.fieldColumns; i++) {
            if (this.field[i] === 0) {
                legalColumns.push(i);
            }
        }
        return legalColumns;
    }

    placeDisc(player, column) {
        for (let i = this.fieldRows; i > 0; i--) {
            let index = i * this.fieldColumns - (this.fieldColumns - column);
            if (this.field[index] === 0) {
                this.field[index] = player;
                return;
            }
        }
    }

    checkWin() {
        let result = false;
        for (let i = 0; i < this.fieldRows; i = i + this.fieldColumns) {
            let row = this.field.slice(i, i + this.fieldColumns);
            if (Board.arrayHasFourInARow(row)) {
                result = true;
                break;
            }
        }

        for (let i = 0; i < this.fieldColumns; i++) {
            let column = []; // TODO
            if (Board.arrayHasFourInARow(column)) {
                result = true;
                break;
            }
        }

        return result;
    }
}

module.exports = Board;
