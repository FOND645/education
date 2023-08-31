var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = []

rl.on("line", function (data) {
    rawData.push(data)
    if (rawData.length == +rawData[0] + 1) console.log(solution(rawData))
});

function solution(rawData) {
    const daysCount = rawData[0]
    let prices = rawData
        .slice(1)
        .map(Number)
        
    if(daysCount == 0) return 0
    if(daysCount == 1) return prices[0]
    let index
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] <= 100) continue
        index = findMaxInArray(prices, i)
        if (index) prices[index] = 0
    }

    return prices.reduce((sum, price) => sum + price, 0)
}

function findMaxInArray(arr, startInd) {
    let index = false
    let max = 0
    for (let i = startInd + 1; i < arr.length; i++) {
        console.log(arr[i])
        if (max < arr[i]) {
            index = i
            max = arr[i]
        }
    }
    return index
}