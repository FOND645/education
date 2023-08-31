
var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data)
    if (rawData.length == 2) console.log(solution(rawData))
});



function solution(rawData) {
    const N = rawData[0]
    const [A, B, C] = rawData[1].split(" ")
    const dp = new Array(N + 1).fill(0);
    dp[1] = 1;

    for (let i = 2; i <= N; i++) {
        if (i - A >= 1) dp[i] |= dp[i - A];
        if (i - B >= 1) dp[i] |= dp[i - B];
        if (i - C >= 1) dp[i] |= dp[i - C];
        console.log(dp)
    }

    let result = 0;
    for (let i = 1; i <= N; i++) {
        if (dp[i] === 1) result++;
    }

    return result;
}