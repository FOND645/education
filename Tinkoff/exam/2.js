const { assert } = require("chai");

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    console.log(solution(data));
});

function solution(str) {
    let alphabet = {
        s: 0,
        h: 0,
        e: 0,
        r: 0,
        i: 0,
        f: 0,
    };
    for (let ch of str) {
        if (alphabet.hasOwnProperty(ch)) {
            alphabet[ch]++;
        }
    }
    return Math.min(alphabet.s, alphabet.h, alphabet.e, alphabet.r, alphabet.i, Math.trunc(alphabet.f / 2));
}

const tests = [
    { rawData: "fheriherffazfszkisrrs", solution: 2 },
    { rawData: "rifftratatashe", solution: 1 },
    { rawData: "thegorillaiswatching", solution: 0 },
    { rawData: "", solution: 0 },
    { rawData: "sherif", solution: 0 },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.rawData);
            assert.equal(result, test.solution);
        });
    });
});
