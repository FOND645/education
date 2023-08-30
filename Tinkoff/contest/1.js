var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let result;

rl.on("line", function (data) {
    let [moneyPerMoth, totalMBperMonth, MBPrice, targetMB] = [...data.split(" ")].map(Number);

    targetMB -= totalMBperMonth;
    if (targetMB <= 0) {
        result = moneyPerMoth;
    } else {
        moneyPerMoth += MBPrice * targetMB;
        result = moneyPerMoth;
    }
    console.log(result);
});
