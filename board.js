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
        return this._checkRows() || this._checkColumns() || this._checkDiaglonals();
    }

    _checkRows() {
        let counter;
        for (let i = 0; i < this.fieldRows; i++) {
            counter = 0;
            for (let j = 1; j < this.fieldColumns; j++) {
                let rowIndex = i * this.fieldColumns;
                let index = rowIndex + j;
                if (this.field[index] === this.field[index - 1]) {
                    counter++;
                } else {
                    counter = 0;
                }
                if (counter === 3 && this.field[index] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkColumns() {
        let counter;
        for (let i = 0; i < this.fieldColumns; i++) {
            counter = 0;
            for (let j = 1; j < this.fieldRows; j++) {
                let rowIndex = j * this.fieldColumns;
                let index = rowIndex + i;
                if (this.field[index] === this.field[index - this.fieldColumns]) {
                    counter++;
                } else {
                    counter = 0;
                }
                if (counter === 3 && this.field[index] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkDiaglonals() {
        for (let i = 0; i < this.field.length / 2; i++) {
            if (this._checkDiagonal(i)) {
                return true;
            }
        }
        return false;
    }

    _checkDiagonal(i) {
        let counter = 0;
        while (typeof this.field[i] !== 'undefined') {
            if (this.field[i] === this.field[i + this.fieldColumns + 1]) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === 3 && this.field[i] !== 0) {
                return true;
            }
            i += this.fieldColumns + 1;
        }
        return false;
    }
}

module.exports = Board;
