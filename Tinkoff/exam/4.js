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
    const [neededSum, countOfNominals] = rawData[0].split(" ").map(Number);
    const nominals = rawData[1].split(" ").map(Number);
    let bank = [];
    nominals.forEach((nom) => {
        bank.push(nom);
        bank.push(nom);
    });
    for (let i = 1; i < Math.pow(2, bank.length); i++) {
        const coefs = i.toString(2).padStart(bank.length, 0).split("");
        let sum = 0;
        coefs.forEach((coef, i) => {
            sum += bank[i] * +coef;
        });
        if (sum === neededSum) {
            let nominals = [];
            coefs.forEach((coef, i) => {
                if (coef === "1") nominals.push(bank[i]);
            });
            return `${nominals.length}\n${nominals.join(" ")}`;
        }
    }
    return -1;
}

const tests = [
    { rawData: ["5 2", "1 2"], solution: 10 },
    { rawData: ["7 2", "1 2"], solution: 10 },
    { rawData: ["5 2", "3 4"], solution: 10 },
    { rawData: ["28 10", "8 15 5 1 14 9 14 2 7 14"], solution: 10 },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.rawData);
            assert.equal(result, test.solution);
        });
    });
});
