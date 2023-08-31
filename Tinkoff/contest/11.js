// var readline = require("readline");
// var rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
// let result;

// rl.on("line", function (data) {
//     console.log(solution(data))
// });

// function solution(data){
//     const [L, R, P] = data.split(" ").map(Number)

// }

let result = 0

for (let i = 1; i <= 5; i++) {
    console.log(Math.pow(1/i, 6) % 7)
    result += Math.pow(i, 6) % 7
}
console.log(result)