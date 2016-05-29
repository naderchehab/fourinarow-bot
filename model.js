"use strict";

class Model {
    constructor(settings, field) {
        this.timebank = settings.timebank;
        this.timePerMove = parseInt(settings.time_per_move, 10);
        this.playerNames = settings.player_names;
        this.yourBot = settings.your_bot;
        this.yourBotId = settings.your_bot_id;
        this.fieldColumns = parseInt(settings.field_columns, 10);
        this.fieldRows = parseInt(settings.field_rows, 10);
        this.field = field;
    }


    getLegalMoves(columns) {
        let legalColumns = [];
        for (let col = 0; col < this.fieldColumns; col++) {
            if (columns[col].length < this.fieldRows) {
                legalColumns.push(col);
            }
        }
        return legalColumns;
    }

    placeDisc(column) {
        return "place_disc " + column;
    }

    getColumns() {
        if (!this.field || this.field.length === 0) {
            return;
        }

        let rows = this.field.split(';');
        let matrix = rows.map(rowStr => {
            let cells = rowStr.split(',');
            let row = cells.map(cell => parseInt(cell, 10));
            return row;
        });

        let columns = [];

        for (let col = 0; col < this.fieldColumns; col++) {
            let column = [];
            for (let row = 0; row < this.fieldRows; row++) {
                let cell = matrix[row][col];
                if (cell !== 0) {
                    column.push(cell);
                }
            }
            columns.push(column);
        }

        return columns;
    }
}

module.exports = Model;
