/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
const { start } = require("repl");
let data = [];
const input = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" })
    .split(/\r\n/gi)
    .forEach((e, i) => {
        data[i] = e.split('').map(n => parseInt(n))
    })

function findNeighbors(startLocation) {
    let neighbors = [
        Coord.createIfValid(startLocation.x - 1, startLocation.y, data),
        Coord.createIfValid(startLocation.x + 1, startLocation.y, data),
        Coord.createIfValid(startLocation.x, startLocation.y - 1, data),
        Coord.createIfValid(startLocation.x, startLocation.y + 1, data)
    ].filter(c => c !== undefined && data[c.x][c.y] !== 9);

    return neighbors;
}


class Basin {
    coords = [];
}
class Coord {
    x;
    y;
    isSearched = false;
    constructor(x, y){ this.x = x; this.y = y;};
    
    static createIfValid(x, y, target) {
        if(target[x] !== undefined && target[x][y] !== undefined)
            return new Coord(x, y);
    }
}

let lowPoints = [];

data.forEach((row, rowI) => {
    row.forEach((cell, columnI) => {
        //up
        if(data[rowI - 1] !== undefined)
            if(data[rowI - 1][columnI] <= cell)
                return;
        //down
        if(data[rowI + 1] !== undefined)
            if(data[rowI + 1][columnI] <= cell)
                return;
        //left
        if(data[rowI][columnI - 1] !== undefined )
            if(data[rowI][columnI - 1] <= cell)
                return;
        //right
        if(data[rowI][columnI + 1] !== undefined)
            if(data[rowI][columnI + 1] <= cell)
                return;

        lowPoints.push(new Coord(rowI, columnI))
    })
})

let basin, basins = [];

for(let lowPoint of lowPoints) {
    basin = new Basin();
    basin.coords.push(lowPoint)

    while([...basin.coords].find(c => !c.isSearched)) {

        for(let i = 0; i < basin.coords.length; i++) {
            if(basin.coords[i].isSearched) 
                continue;
            findNeighbors(basin.coords[i]).forEach(e => {
                if(!basin.coords.find(c => c.x === e.x && c.y === e.y))
                    basin.coords.push(e)
            });

            basin.coords[i].isSearched = true;

        }
    }
    basins.push(basin);

}

basins = basins.sort((a, b) => a.coords.length < b.coords.length? 1 : -1);

console.log(basins[0].coords.length * basins[1].coords.length * basins[2].coords.length);