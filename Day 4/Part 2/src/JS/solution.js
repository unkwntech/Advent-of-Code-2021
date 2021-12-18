/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split("\n");

class BingoBoard {
    rows = [];
    hasWon = false;

    search(number) {
        for(let i = 0; i < this.rows.length; i++){
            for(let j = 0; j < this.rows[i].length; j++) {
                if(this.rows[i][j].value === number) {
                    this.rows[i][j].isMarked = true;
                    return true;
                }
            }
        }
        return false;
    }

    evaluate() {
        //Check rows.
        let rowMatch;
        for(let row of this.rows) {
            rowMatch = row.filter(t => t.isMarked)
            if(rowMatch.length === 5) {
                return true;
            }
        }

        //Check columns.
        let vBingo = false;
        for(let i = 0; i < 5; i++) {
            for(let row of this.rows) {
                vBingo = row[i].isMarked;
                if(!vBingo) break;
            }
            if(vBingo)
                break;
        }
        if(vBingo)
            return true;
        
        return false;
    }

    sumUnmarked() {
        let sum = 0;        
        for(let row of this.rows)
            sum += row.filter(v => !v.isMarked).reduce((a, b) => a + b.value, 0);
        return sum;
    }

    parseRow(rowText) {
        let textValues = rowText.trim().split(/\s+/);
        let row = [];
        for(let v of textValues)
            row.push(new Tile(parseInt(v)));

        this.rows.push(row);
    }
}

class Tile {
    value = 0;
    isMarked = false;
    constructor(v) {
        this.value = v;
    }
}

let numbers = data[0].split(',');

let boards = [];
let newBoard = new BingoBoard();

for(let i = 2; i < data.length; i++) {
    if(data[i].trim().length < 1) {
        boards.push(newBoard);
        newBoard = new BingoBoard();
        continue;
    }

    newBoard.parseRow(data[i]);
}
boards.push(newBoard);
newBoard = new BingoBoard();

let result;
let winningBoard;

for(let number of numbers) {
    for(let board of boards) {
        if(board.hasWon) continue;

        if(board.search(parseInt(number))){
            if(!board.evaluate()) continue;

            board.hasWon = true;
            winningBoard = board.sumUnmarked() * number;
        }
    }
}

console.log(winningBoard)