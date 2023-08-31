var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data)
    if (rawData.length == 2) console.log(solution(rawData))
});

function solution(rawData) {
    const count = +rawData[0]
    let line = rawData[1].split(" ").map(n => +n % 2 == 0)
    const ethalon = Array(line.length).fill(1).map((_, ind) => ind % 2 != 0)

    // console.log(line)
    // console.log(ethalon)

    for (let i = 0; i < line.length; i++) {
        for (let n = i + 1; n < line.length; n++) {
            if (isEqual(ethalon, swapElements(line, i, n))) return `${i + 1} ${n + 1}`
        }
    }
    return `-1 -1`
}

function swapElements(arr, index1, index2) {
    const result = [...arr];
    const temp = result[index1];
    result[index1] = result[index2];
    result[index2] = temp;
    return result;
}

function isEqual(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] != arr2[i]) return false
    }
    return true
}

// const { assert } = require("chai")

// const testData = [
//     { name: "1", input: [1, 2, 3, 4, 5, 6], result: true },
//     { name: "1", input: [1, 2, 8, 4, 5, 6], result: false },
//     { name: "1", input: [1, 2, 7, 4, 5, 6], result: true },
// ]

// describe("Тестируем проверку массива", function () {
//     testData.forEach(test => {
//         it(test.name, function () {
//             assert.equal(checkLine(test.input), test.result)
//         });
//     })

// })