/*
    Notes;
    I converted the data into a JSON array to make processing slightly simpler.

    Requirements;
        Node
*/

const fs = require("fs");
const data = fs.readFileSync(__dirname + "\\..\\..\\TheData.txt", { encoding: "utf-8" }).split("\n");