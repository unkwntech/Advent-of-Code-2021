/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const data = require("./data.json");

let lastNum = data[0], count = 0;

for(let i = 0; i < data.length; i++) {
    if(data[i] > lastNum)
        count++;
    lastNum = data[i];
}

console.log(count);