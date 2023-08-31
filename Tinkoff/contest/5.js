const { assert } = require("chai")

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.on("line", function (data) {
    console.log(solution(data))
});

function getStringOfNumber(num) {
    return Array(num.toString().length).fill(num.toString()[0]).join("");
}

function solution(data) {
    const [min, max] = data.split(" ").map(Number);
    let result

    if (max.toString().length == min.toString().length) {
        result = +max.toString()[0] - +min.toString()[0] - 1
        if (min <= +getStringOfNumber(min)) result++
        if (max >= +getStringOfNumber(max)) result++
        return result
    }

    const basis = (max.toString().length - min.toString().length - 1) * 9
    
    let downPart = 9 - min.toString()[0]
    if (min <= +getStringOfNumber(min)) downPart++

    let upPart = max.toString()[0] - 1
    if (max >= +getStringOfNumber(max)) upPart++

    // console.log("downPart", downPart)
    // console.log("basis", basis)
    // console.log("upPart", upPart)

    return downPart + upPart + basis
}

// const testData = [
//     { name: "Из задачи 1", input: "4 7", result: 4 },
//     { name: "Из задачи 2", input: "10 100", result: 9 },
//     { name: "6 - 70241", input: "6 70241", result: 4 + 3 * 9 + 6 },    
//     { name: "1042 - 8888", input: "1042 8888", result: 8 }, 
//     { name: "1112 - 8888", input: "1112 8888", result: 7 },
//     { name: "1111 - 8887", input: "1111 8887", result: 7 },
//     { name: "1112 - 8887", input: "1112 8887", result: 6 },
//     { name: "100 - 8888", input: "100 8888", result: 9 + 8 },
//     { name: "111 - 8888", input: "111 8888", result: 9 + 8 },
//     { name: "111 - 8887", input: "111 8887", result: 9 + 7 },
//     { name: "112 - 8888", input: "112 8888", result: 8 + 8 },
//     { name: "112 - 8887", input: "112 8887", result: 8 + 7 },
// ]

// describe("Проверка задания", function () {
//     testData.forEach(test => {
//         it(test.name, function () {
//             assert.equal(solution(test.input), test.result)
//         });
//     })

// })