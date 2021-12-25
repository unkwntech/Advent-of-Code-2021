/*
    Notes;
    Same data from Day 1/Part 1
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const data = require("../../../Part 1/src/JS/data.json");

let lastWindow =  data[0] + data[1] + data[2], currentWindow = 0, count = 0;

for(let i = 0; i < data.length; i++) {
    currentWindow = data[i] + data[i+1] + data[i+2];
    if(currentWindow > lastWindow)
        count++;
    lastWindow = currentWindow;
}

console.log(count);