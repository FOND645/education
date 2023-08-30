var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let result = 0;

process.stdin.on('end', () => {
    console.log(result)
    process.exit(0);
});

rl.on('line', function (data) {
    let [moneyPerMoth, totalMBperMonth, MBPrice, targetMB] = [...data.split("  ")].map(n => +n)

    targetMB -= totalMBperMonth
    if (targetMB <= 0) {
        result = moneyPerMoth
    } else {
        moneyPerMoth += (MBPrice * targetMB)
        result = moneyPerMoth
    }
    console.log(result)
    process.exit(0)
});


var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let total = 0;
process.stdin.on("end", () => { console.log(total); process.exit(0); });
rl.on('line', function (data) {
    data = data.split(' ');
    total += parseInt(data[0]) || 0;
    total += parseInt(data[1]) || 0;
    console.log(total)
});
