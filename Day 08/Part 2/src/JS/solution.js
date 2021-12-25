/*
    Notes;

    Requirements;
        Node
*/



let truth = Array(9).fill(0);

const A = 1 << 6;
const B = 1 << 5;
const C = 1 << 4;
const D = 1 << 3;
const E = 1 << 2;
const F = 1 << 1;
const G = 1 << 0;

const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TestData.txt", { encoding: "utf-8" }).split("\n");

let count = 0;

function countSetBits(n) {
    var count = 0;
    while (n)
    {
        count += n & 1;
        n >>= 1;
    }
    return count;
}

function parse(input){
    if(input === undefined)
        return 0
    let output = 0;
    for(let l of input) {
        switch(l) {
            case 'a':
                output |= A;
                break;
            case 'b':
                output |= B;
                break;
            case 'c':
                output |= C;
                break;
            case 'd':
                output |= D;
                break;
            case 'e':
                output |= E;
                break;
            case 'f':
                output |= F;
                break;
            case 'g':
                output |= G;
                break;
        }
    }
    return output;
}

while(truth.filter(v => v===0).length > 0)
for(let i = 0; i < data.length; i++) {
    let words = data[i].split("|")[1].trim().split(/\s+/);
    //4 numbers with unique lengths
    if(!truth[1])
        truth[1] = parse(words.find(w => w.length === 2));
    if(!truth[4])
        truth[4] = parse(words.find(w => w.length === 4));
    if(!truth[7])
        truth[7] = parse(words.find(w => w.length === 3));
    if(!truth[8])
        truth[8] = parse(words.find(w => w.length === 7));

    //6 has 6 total bits and shares 3 of them with 4
    if(!truth[6] && truth[4])
        truth[6] = parse(words.find(w => {
            let q = (w.length === 6 && countSetBits(parse(w) & truth[4]) == 3)
            return q;
        }))

    //9 has 5 total bits and all of the bits from 4 are included
    if(!truth[9])
        truth[9] = parse(words.find(w => {
            return (w.length === 5 && (parse(w) & truth[4]) === truth[4])
        }))

    //2 has 5 total bits and shares 2 of them with 4
    if(!truth[2] && truth[3] && truth[4] && truth[1] && truth[6])
        truth[2] = (~truth[4] | truth[3]) & ~(truth[6] & truth[1]);

    //3 has 5 total bits and all of the bits from 1 are included
    if(!truth[3])
        truth[3] = parse(words.find(w => {
            return (w.length === 5 && (parse(w) & truth[1]) === truth[1])
        }))

    //5 has 5 total bits and shares 3 of them with 4 and is not 3
    if(!truth[5])
        truth[5] = parse(words.find(w => {
            return (w.length === 5 && countSetBits(parse(w) & truth[4]) == 3 && parse(w) !== truth[3])
        }))

}

console.log(count)
