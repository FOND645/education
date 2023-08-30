var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", function (data) {
    let N = +data;

    let result = 0;
    while (N > 1) {
        N = N / 2;
        result++;
    }
    console.log(result);
});
