/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
let data = [];
const input = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" })
    .split(/\r\n/gi)
    .forEach((e, i) => {
        data[i] = e.split('').map(n => parseInt(n))
    })

let sum = 0;
data.forEach((row, rowI) => {
    row.forEach((cell, columnI) => {
        if(rowI == 0 && columnI == 61)
            console.log();
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
        
        console.log(rowI, columnI, cell)

        //Low point found
        sum += cell + 1;
    })
})

console.log(sum); //633
//Wrong 1763, too high.
//Wrong 1688, too high.
//Wrong 1624, too high