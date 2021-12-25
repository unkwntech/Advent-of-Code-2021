/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" })
    .split(",")
    .map(n => parseInt(n));

let fuelUsed = 0;
let searchRange = data.reduce((a, b) => (a > b) ? a : b);
let bestFuelUsed = Number.MAX_VALUE, bestFuelPosition;
let distance;
for(let i = 0; i < searchRange; i++) {
    fuelUsed = 0;

    for(let position of data) {
        distance = Math.abs(position - i);
        fuelUsed += (1 + distance) * distance / 2;
    }

    if(fuelUsed < bestFuelUsed) {
        bestFuelUsed = fuelUsed;
        bestFuelPosition = i;
    }

    console.log(`Position ${i}: ${fuelUsed} fuel.`)
}

console.log(bestFuelUsed);