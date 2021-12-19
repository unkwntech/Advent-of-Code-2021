/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
const { Z_FIXED } = require("zlib");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split(",");

let fish = [];

for(let f of data) {
    fish.push(parseInt(f));
}

let targetDays = 80;
let newFishCount;

for(let i = 0; i < targetDays; i++) {
    newFishCount = 0;
    for(j in fish) {
        fish[j]--;
        if(fish[j] === -1) {
            newFishCount++;
            fish[j] = 6;
        }
    }
    for(let j = 0; j < newFishCount; j++)
        fish.push(8);
}

console.log(fish.length)