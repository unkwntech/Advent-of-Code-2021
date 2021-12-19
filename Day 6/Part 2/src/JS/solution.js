/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");


let targetDays = 256;
let counts = Array(9).fill(0);

fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" })
    .split(",")
    .map(n => parseInt(n))
    .forEach(f => counts[f]++)

for( let i = 0; i < targetDays; i++) {
    const newFish = counts.shift();
    counts[6] += newFish;
    counts.push(newFish);
    console.log(`Day ${i}, Fish ${counts.reduce((a, b) => a+b)}`);
}

console.log(counts.reduce((a, b) => a+b))
//Wrong 26984457539, too low