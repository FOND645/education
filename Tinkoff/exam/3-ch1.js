const { assert } = require("chai");

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data);
    if (rawData.length === 3) console.log(solution(rawData) ? "YES" : "NO");
});

function solution(rawData) {
    const a = rawData[1].split(" ").map(Number);
    const b = rawData[2].split(" ").map(Number);
    const n = a.length;

    // Проверка условия (1)
    if (a.join("") === b.join("")) {
        return true;
    }

    // Проверка условия (2)
    if (
        a
            .slice()
            .sort((x, y) => x - y)
            .join("") === b.join("")
    ) {
        return true;
    }

    // Нахождение длины ЛИС в последовательности a
    const lisLength = findLISLength(a);

    // Если длина ЛИС >= длине b, проверяем условие (3)
    if (lisLength >= b.length) {
        let lisEndIndex = -1;

        for (let i = 0; i < n; i++) {
            if (a[i] === b[0]) {
                lisEndIndex = i;
                break;
            }
        }

        let lisStartIndex = lisEndIndex - lisLength + 1;

        if (lisStartIndex >= 0) {
            const lisSubsequence = a.slice(lisStartIndex, lisEndIndex + 1);
            const bSubsequence = b.slice(0, lisLength);

            // Проверка, можно ли преобразовать подпоследовательность ЛИС в b
            if (canTransformToSequence(lisSubsequence, bSubsequence)) {
                return true;
            }
        }
    }

    return false;
}

function findLISLength(arr) {
    const n = arr.length;
    const dp = new Array(n).fill(1);

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
            }
        }
    }

    return Math.max(...dp);
}

function canTransformToSequence(sequence, target) {
    const n = sequence.length;
    const m = target.length;

    for (let i = 0; i < n - m + 1; i++) {
        const subsequence = sequence.slice(i, i + m);
        if (subsequence.join("") === target.join("")) {
            return true;
        }
    }

    return false;
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
            const result = solution(test.rawData) ? "YES" : "NO";
            assert.equal(result, test.solution);
        });
    });
});
