const { assert } = require("chai")

function solution(inp) {
    const num = +inp
    let countOfPalindromse = 0
    if (num <= 9) return num
    if (num > 9) countOfPalindromse += 9

    if (11 < num && num <= 99) {
        countOfPalindromse += Math.trunc(num / 10)
        return countOfPalindromse
    }
    if (num > 99) countOfPalindromse += 9

    if (101 < num && num <= 999) {
        countOfPalindromse += Math.trunc(num / 10)
        return countOfPalindromse
    }
    if (num > 999) countOfPalindromse += 89

    if (1001 < num && num <= 9999) {
        countOfPalindromse += Math.trunc(num / 100)
        return countOfPalindromse
    }
    if (num > 9999) countOfPalindromse += 89

    if (1001 < num && num <= 9999) {
        countOfPalindromse += Math.trunc(num / 100)
        return countOfPalindromse
    }
    if (num > 9999) countOfPalindromse += 899

    return countOfPalindromse
}

const tests = [
    { input: 4, solution: 9 },
    { input: 8, solution: 9 },
    { input: 9, solution: 9 },
    { input: 10, solution: 9 },
    { input: 15, solution: 11 },
    { input: 42, solution: 19 },
    { input: 50, solution: 22 },
    { input: 88, solution: 17 },
    { input: 96, solution: 41 },
    { input: 100, solution: 41 },
    { input: 144, solution: 60 },
    { input: 150, solution: 62 },
    { input: 450, solution: 152 },
    { input: 700, solution: 204 },
    { input: 988, solution: 299 },
    { input: 999, solution: 299 },
    { input: 1000, solution: 299 },
    { input: 1002, solution: 299 },
    { input: 1050, solution: 322 },
    { input: 1500, solution: 401 },
    { input: 9998, solution: 1099 },
    { input: 9999, solution: 1099 },
    { input: 10000, solution: 1099 },
    { input: 10005, solution: 1099 },
    { input: 11000, solution: 1199 },
    { input: 50000, solution: 4851 },
    { input: 99998, solution: 9900 },
    { input: 99999, solution: 9900 },
    { input: 100000, solution: 9900 }
];

describe("Проверка задания", function () {
    tests.forEach(test => {
        it(test.input.toString(), function () {
            const result = solution(test.input)
            assert.equal(result, testFunc(test.input))
        });
    })
})

function testFunc(inp) {
    let result = 0
    let i = 1
    for (i = 1; i <= inp; i++) {
        if (isPalindrome(i)) result++
    }
    return result
}

function isPalindrome(number) {
    const numStr = number.toString();
    const reversedStr = numStr.split('').reverse().join('');
    return numStr === reversedStr;
}