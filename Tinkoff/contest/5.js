var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", function (data) {
    const [min, max] = data.split(" ").map(Number);
    let basis = max.toString().length - min.toString().length < 2 ? 0 : (max.toString().length - min.toString().length) * 9;

    if (max.toString().length == min.toString().length) {
        let result = +max.toString()[0] - +min.toString()[0] - 1;
        if (min <= getStringOfNumber(min)) result++;
        if (max >= getStringOfNumber(max)) result++;
        console.log(result);
        return;
    }

    let downPart = 9 - min.toString()[0];
    let upPart = +max.toString()[0] - 1;

    if (min <= getStringOfNumber(min)) downPart++;
    if (max >= getStringOfNumber(max)) upPart++;

    // console.log("basis", basis);
    // console.log("downPart", downPart);
    // console.log("upPart", upPart);

    console.log(downPart + basis + upPart);
});

function getStringOfNumber(num) {
    return Array(num.toString().length).fill(num.toString()[0]).join("");
}
