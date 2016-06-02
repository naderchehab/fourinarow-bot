'use strict';

class Board {
    constructor(settings, field) {
        this.timebank = settings.timebank;
        this.timePerMove = parseInt(settings.time_per_move, 10);
        this.playerNames = settings.player_names;
        this.yourBot = settings.your_bot;
        this.yourBotId = settings.your_bot_id;
        this.fieldColumns = parseInt(settings.field_columns, 10);
        this.fieldRows = parseInt(settings.field_rows, 10);
        this.field = this.getFieldArray(field)
    }

    getFieldArray(field) {
        return field.split(/[,;]+/g).map(char => parseInt(char, 10));
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
}

module.exports = Board;
