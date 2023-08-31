var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = []

rl.on("line", function (data) {
    rawData.push(data)
    if (rawData.length == 2) console.log(solution(rawData))
});

function solution(rawData) {
    const [countOfNubers, countOfActions] = rawData[0].split(" ")
    let nums = rawData[1]
        .split(" ")
        .map(Number)
        .sort()
    const lastSum = nums.reduce((sum, num) => sum + num, 0)
    console.log(nums)
    let index
    for (let i = 1; i <= countOfActions; i++) {        
        index = findMaxProfit(nums)
        console.log(index)
        console.log(nums)
        nums[index] = replaceTo9(nums[index])
    }
    console.log(nums)
    const newSum = nums.reduce((sum, num) => sum + num, 0)
    return newSum - lastSum
    
}

function findMaxProfit(arr){
    let max = 0
    let index
    arr.forEach((num, ind) => {
        let newNum = num.toString().split("")
        for (let i = 0; i < newNum.length; i++) {
            if (newNum[i] !== "9") {newNum[i] = "9"; break}
        }
        newNum = +newNum.join("")
        if (max < newNum - num) {
            max = newNum
            index = ind
        }
    })
    return index
}

function replaceTo9 (num) {
    num = num.toString().split("")
    for (let i = 0; i < num.length; i++) {
        if (num[i] !== "9") {num[i] = "9"; break}
    }
    return +num.join("")
}