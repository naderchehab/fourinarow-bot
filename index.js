"use strict";

let fs = require('fs');
let readline = require('readline');
let commands = require('./commands');
let log = require('./log');

fs.stat('bot.log', function(err, stat) {
    if (!err) {
        fs.unlinkSync('bot.log');
    }
});


let io = readline.createInterface(process.stdin, process.stdout);

io.on('line', data => {
    // stop if line doesn't contain anything
    if (data.length === 0) {
        return;
    }

    let lines = data.trim().split('\n');

    lines.forEach(line => {
        let response;
        let lineParts = line.trim().split(" ");
        let command = lineParts.shift().toLowerCase();
        if (commands[command]) {
            response = commands[command](lineParts);
            process.stdout.write(response + '\n');
        }
    });
});

io.on('close', () => {
    process.exit(0);
});
