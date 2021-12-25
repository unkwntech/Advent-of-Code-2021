/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/


const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split("\n");

class Line {
    startX;
    startY;
    endX;
    endY;
}

let lines = [];
let start, end;
let newLine;
//Parse line data
for(let line of data) {
    newLine = new Line();

    start = line.split(" -> ")[0].trim();
    end = line.split(" -> ")[1].trim();

    newLine.startX = parseInt(start.split(",")[0].trim());
    newLine.startY = parseInt(start.split(",")[1].trim());

    newLine.endX = parseInt(end.split(",")[0].trim())
    newLine.endY = parseInt(end.split(",")[1].trim())

    lines.push(newLine);
}

//Find largest X & Y to generate a map
let maxStartX = lines.reduce((p, c) => (p.startX > c.startX) ? p : c);
let maxEndX = lines.reduce((p, c) => (p.endX > c.endX) ? p : c);
let maxX = (maxStartX.startX > maxEndX.endX) ? maxStartX.startX : maxEndX.endX;

let maxStartY = lines.reduce((p, c) => (p.startY > c.startY) ? p : c);
let maxEndY = lines.reduce((p, c) => (p.endY > c.endY) ? p : c);
let maxY = (maxStartY.startY > maxEndY.endY) ? maxStartY.startY : maxEndY.endY;

let map = [];
let row = [];
//Generage the map
/*
    |
    |
    |
Y   |
    |
    |
    -------------------
            X
*/
for(let i = 0; i <= maxX; i++) {
    row[i] = 0;
}

for(let i = 0; i <= maxY; i++) {
    map.push([...row]);
}

//"Draw" lines on map
for(let line of lines ) {
    if(line.startX !== line.endX && line.startY !== line.endY)
        continue;
    if(line.startX === line.endX) {
        //moving valong y
        if(line.startY > line.endY) {
            //decrement
            for(let i = line.startY; i >= line.endY; i--)
                map[i][line.startX]++
        } else {
            //increment
            for(let i = line.startY; i <= line.endY; i++)
                map[i][line.startX]++
        }        
    } else {
        //moving along x
        if(line.startX > line.endX) {
            //decrement
            for(let i = line.startX; i >= line.endX; i--)
                map[line.startY][i]++
        } else {
            //increment
            for(let i = line.startX; i <= line.endX; i++)
                map[line.startY][i]++
        }
    }
}

let sum = 0;
for(let row of map) {
    sum += row.filter(v => v >= 2).length;
}

console.log(sum);