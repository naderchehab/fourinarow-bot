'use strict';

let _ = require('lodash');

const emptyCell = 'X';
const player1Id = 'a';
const player1Name = 'player1';
const player2Id = 'b';
const player2Name = 'player2';

class Board {
    constructor(settings, winNum, field) {
        this.settings = settings;
        this.fieldColumns = parseInt(this.settings.field_columns, 10);
        this.fieldRows = parseInt(this.settings.field_rows, 10);
        field = field || Board.createEmptyField(this.fieldColumns, this.fieldRows);
        this.timebank = this.settings.timebank;
        this.timePerMove = parseInt(this.settings.time_per_move, 10);
        this.playerNames = this.settings.player_names;
        this.yourBot = this.settings.your_bot;
        this.yourBotId = this.settings.your_botid;
        this.field = Array.isArray(field) ? field : Board.getFieldArray(field);
        this.winNum = winNum;
        this.gameEnded = false;
    }

    static createEmptyField(fieldColumns, fieldRows) {
        let rows = [];
        let row = _.times(fieldColumns, _.constant(emptyCell)).join(',');
        for (let i = 0; i < fieldRows; i++) {
            rows.push(row);
        }
        return rows.join(';');
    }

    static getFieldArray(field) {
        if (field.indexOf(',') === -1) {
            return field.split('');
        }
        return field.split(/[,;]+/g);
    }

    static getMoveFromStateDiff(state1, state2, fieldColumns) {
        let retValue;
        for (let i = 0; i < state1.length; i++) {
            let diff = state2[i].charCodeAt(0) - state1[i].charCodeAt(0);
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
        this.gameEnded = false;
        this.field = _.times(this.fieldColumns * this.fieldRows, _.constant(emptyCell));
    }

    getFieldAsString() {
        return this.field.join('');
    }

    clone() {
        let copy = new Board(this.settings, this.winNum, this.field.slice());
        copy.yourBot = this.yourBot;
        copy.yourBotId = this.yourBotId;
        return copy;
    }

    getLegalMoves() {
        let legalColumns = [];
        for (let i = 0; i < this.fieldColumns; i++) {
            if (this.field[i] === emptyCell) {
                legalColumns.push(i);
            }
        }
        return legalColumns;
    }

    placeDisc(column) {
        for (let i = this.fieldRows; i > 0; i--) {
            let index = i * this.fieldColumns - (this.fieldColumns - column);
            if (this.field[index] === emptyCell) {
                this.field[index] = this.yourBotId;
                return true;
            }
        }
        return false;
    }

    checkWin() {
        return this._checkRows() || this._checkColumns() || this._checkDiaglonals();
    }

    checkDraw() {
        for (let i = 0; i < this.fieldColumns; i++) {
            if (this.field[i] === emptyCell) {
                return false;
            }
        }
        return true;
    }

    nextPlayer() {
        if (this.yourBotId === player1Id) {
            this.yourBotId = player2Id;
            this.yourBot = player2Name;
        }
        else {
            this.yourBotId = player1Id;
            this.yourBot = player1Name;
        }
    }

    print() {
        let row = '';
        for (let i = 0; i < this.field.length; i++) {
            row += this.field[i] + ' ';
            if ((i + 1) % this.fieldColumns === emptyCell) {
                console.log(row);
                row = '';
            }
        }
        console.log('');
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
                if (counter === this.winNum - 1 && this.field[index] !== emptyCell) {
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
                if (counter === this.winNum - 1 && this.field[index] !== emptyCell) {
                    return true;
                }
            }
        }
        return false;
    }

    _checkDiaglonals() {
        for (let i = 0; i < this.field.length / 2; i++) {
            if (this._checkDiagonal(i) || this._checkBackwardsDiagonal(i)) {
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
            if (counter === this.winNum - 1 && this.field[i] !== emptyCell) {
                return true;
            }
            i += this.fieldColumns + 1;
        }
        return false;
    }

    _checkBackwardsDiagonal(i) {
        let counter = 0;
        while (typeof this.field[i] !== 'undefined') {
            if (i + this.fieldColumns - 1 >= 0 && this.field[i] === this.field[i + this.fieldColumns - 1]) {
                counter++;
            } else {
                counter = 0;
            }
            if (counter === this.winNum - 1 && this.field[i] !== emptyCell) {
                return true;
            }
            i += this.fieldColumns - 1;
        }
        return false;
    }
}

module.exports = Board;
