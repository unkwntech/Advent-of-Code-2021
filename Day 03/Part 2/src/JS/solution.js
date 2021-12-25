/*
    Notes;
    
    Requirements;
        Node
        fs
*/

/*
Keep numbers where first bit is 1. If 0 is equal to 1, keep 1.
    repeat for all columns
    stop if 1 value
*/

const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split("\n");

let byteLength = data[0].trim().length;
let count = 0;
let oxydata = data, co2data = data;

for(let i = 0; i < byteLength; i++) {
    count = oxydata.filter(d => {return d.trim()[i] === "1"}).length;

    //more 1s than 0s
    if(count > (oxydata.length / 2) || count === (oxydata.length / 2)) {
        oxydata = oxydata.filter(d => {return d.trim()[i] === "1"});
    }
    else {//more 0s than 1s
        oxydata = oxydata.filter(d => {return d.trim()[i] === "0"});
    }

    if(oxydata.length === 1)
        break;
}

for(let i = 0; i < byteLength; i++) {
    count = co2data.filter(d => {return d.trim()[i] === "1"}).length;

    //more 1s than 0s
    if(count > (co2data.length / 2) || count === (co2data.length / 2)) {
        co2data = co2data.filter(d => {return d.trim()[i] === "0"});
    }
    else {//more 0s than 1s
        co2data = co2data.filter(d => {return d.trim()[i] === "1"});
    }

    console.log(count);
    
    if(co2data.length === 1)
        break;

    console.log();
}

let oxyBinary = oxydata[0].trim();
let co2Binary = co2data[0].trim();

let oxyRating = 0, co2Rating = 0;

//convert binary arrays to int
for(let i = 0; i < byteLength; i++) {
    oxyRating |= oxyBinary[i] << (byteLength - i - 1)
    co2Rating |= co2Binary[i] << (byteLength - i - 1)
}

console.log(oxyRating, co2Rating);

console.log(oxyRating * co2Rating);
//Wrong 4179582 too low
//Wrong 4487283 too high