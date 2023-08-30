var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    rawData.push(data);
    if (rawData.length == 3) console.log(solution(rawData));
});

function solution(rawData) {
    let [countOfDocs, timeToLive] = rawData[0].split(" ").map(Number);
    countOfDocs--;
    const floorsToVisit = rawData[1].split(" ").map(Number);
    const tempedFloor = +rawData[2] - 1;

    // console.log("countOfDocs", countOfDocs);
    // console.log("timeToLive", timeToLive);
    // console.log("tempedFloor", tempedFloor);

    // Проверяем случаи если нужный этаж первый или последний
    if (tempedFloor == 0 || tempedFloor == countOfDocs) return floorsToVisit[countOfDocs] - floorsToVisit[0];

    // ПРоверяем может время больше чем время за которое все обойдется
    let startToEnd = floorsToVisit[countOfDocs] - floorsToVisit[0];
    // console.log("startToEnd", startToEnd);
    if (startToEnd < timeToLive) return startToEnd;

    // Проверяем успеем ли мы пробежать этажи выше или ниже до истечения времени
    let fromStart = floorsToVisit[tempedFloor] - floorsToVisit[0];
    // console.log("fromStart", fromStart);
    let fromEnd = floorsToVisit[countOfDocs] - floorsToVisit[tempedFloor];
    // console.log("fromEnd", fromEnd);
    let startOrEnd = fromStart > fromEnd ? fromEnd : fromStart;
    // console.log("startOrEnd", startOrEnd);
    if (startOrEnd <= timeToLive) return floorsToVisit[countOfDocs] - floorsToVisit[0];

    const down = floorsToVisit[tempedFloor] - floorsToVisit[0] + (floorsToVisit[countOfDocs] - floorsToVisit[0]);
    // console.log("down", down);

    const up = floorsToVisit[countOfDocs] - floorsToVisit[tempedFloor] + (floorsToVisit[countOfDocs] - floorsToVisit[0]);
    // console.log("down", down);

    return up > down ? down : up;
}
