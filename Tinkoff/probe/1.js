var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data);
    if (rawData.length == 2) console.log(+rawData[0] + +rawData[1]);
});
