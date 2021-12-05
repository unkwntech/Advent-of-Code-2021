/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const data = require("./data.json");

let hPos = 0, vPos = 0;

//Iterate over dataset
for(let i = 0; i < data.length; i++) {
    //switch on the first leter of the directions
    switch(data[i][0]) {
        case "f":
            hPos += parseInt(data[i].split(" ")[1]);
            break;
        case "d":
            vPos += parseInt(data[i].split(" ")[1]);
            break;
        case "u":
            vPos -= parseInt(data[i].split(" ")[1]);
            break;
    }
}

console.log(hPos * vPos);