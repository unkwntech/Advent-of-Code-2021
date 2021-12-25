/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.
    This is the least possible memory efficient method to read all of the data
        as it requires reading the entire file into memory before starting

    Requirements;
        Node
*/

//Get the JSON version of the data that we created.
const data = require("./data.json");

let lastNum = data[0], count = 0;

//Iterate over each element in the array
for(let i = 0; i < data.length; i++) {
    if(data[i] > lastNum)
        count++;
    lastNum = data[i];
}

console.log(count);