const { assert } = require("chai");

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data);
    if (rawData.length === 2) console.log(solution(rawData));
});

function solution(rawData) {
    const [countOfGuns, money] = rawData[0].split(" ").map(Number);
    const prices = rawData[1].split(" ").map(Number);
    let mostExpencive = 0;
    for (let price of prices) {
        if (price === money) return price;
        console.log();
        if (price < money && price > mostExpencive) mostExpencive = price;
    }
    return mostExpencive;
}

const tests = [
    { rawData: ["5 13", "3 10 300 15 3"], solution: 10 },
    { rawData: ["3 4", "5 12 10"], solution: 0 },
    { rawData: ["5 13", "3 13 300 15 3"], solution: 13 },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.rawData);
            assert.equal(result, test.solution);
        });
    });
});
