const inputData = `6  4
1  2  3  6  8  25
5`

function solution(inputData) {
    const rawData = inputData.split(`\n`)
    let [countOfDocs, timeToLive] = rawData[0].split("  ").map(n => +n)
    countOfDocs--
    const floorsToVisit = rawData[1].split("  ").map(n => +n).sort((a, b) => a - b)
    const tempedFloor = +rawData[2] -1

    console.log("countOfDocs", countOfDocs, "timeToLive", timeToLive)
    console.log("floorsToVisit", floorsToVisit)
    console.log("tempedFloor", tempedFloor)
    // Проверяем случаи если нужный этаж первый или последний
    if (tempedFloor == 0 || tempedFloor == countOfDocs) return floorsToVisit[countOfDocs] - floorsToVisit[0]
    
    // ПРоверяем может время больше чем время за которое все обойдется
    let startToEnd = floorsToVisit[countOfDocs] - floorsToVisit[0]
    console.log("startToEnd" , startToEnd)
    if (startToEnd < timeToLive) return startToEnd

    // Проверяем успеем ли мы пробежать этажи выше или ниже до истечения времени
    let fromStart = floorsToVisit[tempedFloor] - floorsToVisit[0]
    console.log("fromStart" , fromStart)
    let fromEnd = floorsToVisit[countOfDocs] - floorsToVisit[tempedFloor]
    console.log("fromEnd" , fromEnd)
    let startOrEnd = fromStart > fromEnd ? fromEnd : fromStart
    console.log("startOrEnd" , startOrEnd)
    if (startOrEnd <= timeToLive) return floorsToVisit[countOfDocs] - floorsToVisit[0]

    const down = (floorsToVisit[tempedFloor] - floorsToVisit[0]) + 
    (floorsToVisit[countOfDocs] - floorsToVisit[0])
    console.log("down" , down)

    const up = (floorsToVisit[countOfDocs] - floorsToVisit[tempedFloor]) + 
    (floorsToVisit[countOfDocs] - floorsToVisit[0])
    console.log("up" , up)

    return up > down ? down : up

}

console.log(solution(inputData))