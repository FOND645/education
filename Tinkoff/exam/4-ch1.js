const { assert } = require("chai");

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data);
    if (rawData.length === 2) {
        let(result[0] === -1);
    }
});

function solution(rawData) {
    const [n, m] = rawData[0].split(" ").map(Number);
    const denominations = rawData[1].split(" ").map(Number);

    const count = new Map();

    for (let i = 0; i < m; i++) {
        if (denominations[i] <= n) {
            const remaining = n - denominations[i];
            if (count.has(remaining)) {
                return [2, denominations[i], remaining];
            }
            count.set(denominations[i], true);
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = i + 1; j < m; j++) {
            if (denominations[i] + denominations[j] === n) {
                return [2, denominations[i], denominations[j]];
            }
        }
    }

    return [-1];
}

const tests = [
    { rawData: ["5 2", "1 2"], solution: 10 },
    { rawData: ["7 2", "1 2"], solution: 0 },
    { rawData: ["5 2", "3 4"], solution: 13 },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.rawData);
            console.log(result);
        });
    });
});
