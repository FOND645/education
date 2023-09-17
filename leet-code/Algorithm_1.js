const { assert } = require("chai");

function solution(s) {
    s = s.split("");
    if (s.length === 0) return 0;
    let result = 1;
    let tempResult = 0;
    let alphabet = {};
    while (s.length !== 0) {
        tempResult = 0;
        alphabet = {};
        for (let char of s) {
            if (alphabet.hasOwnProperty(char)) {
                result = result < tempResult ? tempResult : result;
                break;
            } else {
                alphabet[char] = true;
                tempResult++;
            }
        }
        result = result < tempResult ? tempResult : result;
        if (result === s.length) return result;
        s.shift();
    }
    return result;
}

const tests = [
    { input: "abcabcbb", solution: 3 },
    { input: "bbbbb", solution: 1 },
    { input: "pwwkew", solution: 3 },
    { input: "", solution: 0 },
    { input: "au", solution: 2 },
];

describe("Проверка задания", function () {
    tests.forEach((test) => {
        it(test.input, function () {
            const result = solution(test.input);
            assert.equal(result, test.solution);
        });
    });
});
