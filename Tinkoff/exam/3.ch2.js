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
    // Если последовательности a и b уже совпадают, то он не нуждается в применении операции. В этом случае он уже имеет выигрышную последовательность.
    if (a === b || a.sort().join("") === b.join("")) {
        return true;
    }
    // Найти самую длинную возрастающую подпоследовательность (ЛИС) в последовательности a. Это можно сделать, используя алгоритм динамического программирования, который найдет длину ЛИС.
    const lis = longestIncreasingSubsequence(a);
    // Если длина этой ЛИС больше или равна длине последовательности b, то он может просто выбрать элементы из этой ЛИС в соответствии с порядком в b.
    if (lis.length >= b.length) {
        return true;
    }
    // Если длина ЛИС меньше длины b, то ему придется выполнить дополнительные шаги.
    // Он должен найти первую карту в b, которая не присутствует в ЛИС. Пусть это будет карта с индексом i в b.
    const i = b.findIndex((x) => !lis.includes(x));
    // Затем он должен найти самую правую карту с таким же значением, как и карта в b[i] в ЛИС. Пусть это будет карта с индексом j в ЛИС.
    const j = lis.lastIndexOf(b[i]);
    // Затем он должен обменять подпоследовательность [i, j] в ЛИС на подпоследовательность из b[i:j+1]. Теперь у него есть выигрышная последовательность.
    const subsequence = b.slice(i, j + 1);
    subsequence.reverse();
    return [...a.slice(0, i), ...subsequence, ...a.slice(j + 1)].sort().join("") === b.join("");
}

// Функция longestIncreasingSubsequence принимает массив a и возвращает самую длинную возрастающую подпоследовательность (ЛИС) этого массива.
function longestIncreasingSubsequence(a) {
    const dp = Array(a.length).fill(1);
    for (let i = 1; i < a.length; i++) {
        for (let j = 0; j < i; j++) {
            if (a[i] > a[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return a.filter((_, i) => dp[i] === Math.max(...dp));
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
