function solution(str) {
    let [rPerMoth, totalMBperMonth, MBPrice, targetMB] = [...str.split(" ")]
    rPerMoth = +rPerMoth
    totalMBperMonth = +totalMBperMonth
    MBPrice = +MBPrice
    targetMB = +targetMB

    targetMB -= totalMBperMonth
    if (targetMB <= 0) return rPerMoth
    rPerMoth += MBPrice * targetMB
    return rPerMoth
}

console.log(solution("100 10 12 1"))

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let total = 0;
process.stdin.on('end', () => { console.log(total); process.exit(0); });
rl.on('line', function (data) {

});