/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split("\n");

let count = 0;

for(let i = 0; i < data.length; i++) {
    data[i].split("|")[1].split(/\s+/).forEach(e => {
        if(e.trim().length == 2)
            count++;
        if(e.trim().length == 3)
            count++;
        if(e.trim().length == 4)
            count++;
        if(e.trim().length == 7)
            count++;
    });
}

console.log(count)