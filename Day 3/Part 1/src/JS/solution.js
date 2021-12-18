/*
    Notes;
        This took more revisions than I should admit and while it's working I'm unhappy with it.
        In the interest of moving on to part 2 I am not going to refactor this again.
    Requirements;
        Node
        fs
*/
const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split("\n");

let gamma = 0, epsilon = 0, byteLength = data[0].trim().length, bitmask = 0;
let columnCounts = [];

for(let line of data) {
    for(let i =0; i < byteLength; i++) {
        if(!columnCounts[i])
            columnCounts[i] = 0;

        if(line[i] == "1")
            columnCounts[i]++;
    }
}
for(let i = 0; i < byteLength; i++) {
    gamma |= (columnCounts[i] > (data.length / 2)? 1 : 0) << (byteLength - i - 1)
    bitmask |= 1 << i;
}

//invert gamma to get epsilon and mask off anything after byteLength bits
epsilon = ~gamma & bitmask;

console.log(gamma * epsilon);