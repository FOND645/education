const { assert } = require("chai");

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data);
    if (rawData.length === 3) console.log(solution(rawData));
});

function solution(rawData) {
    const length = rawData[0];
    const a = rawData[1].split(" ").map(Number);
    const b = rawData[2].split(" ").map(Number);
    let ps = [
        // number[][]
    ];
    if (a.length !== b.length) return "NO";
    let startPoint;
    let endPoint;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            startPoint = i;
            break;
        }
    }
    for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] !== b[i]) {
            endPoint = i;
            break;
        }
    }
    if (!startPoint && !endPoint) return "YES";
    let newArr = [...a.slice(0, startPoint), ...a.slice(startPoint, endPoint + 1).sort(), ...a.slice(endPoint + 1)];

    return b === newArr ? "YES" : "NO";
}

const tests = [
    { rawData: ["5", "1 4 2 2 4", "1 4 4 2 2"], solution: "NO" },
    { rawData: ["6", "5 1 2 5 3 5", "5 1 2 3 5 5"], solution: "YES" },
    { rawData: ["3", "4 1 2", "1 4 7"], solution: "NO" },
    { rawData: ["1", "7", "7"], solution: "YES" },
    { rawData: ["7", "4 4 1 7 5 3 8", "4 1 4 5 7 3 8"], solution: "YES" },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.rawData);
            assert.equal(result, test.solution);
        });
    });
});
