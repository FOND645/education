
function method(inputString) {
    const data = inputString.split(" ");
    let day = 1
    let currentDaySteps = +data[0]
    let totalSteps = currentDaySteps
    const target = +data[1]
    while (totalSteps < target) {
        day++
        currentDaySteps = currentDaySteps * 1.7
        totalSteps = totalSteps + currentDaySteps
    }
    return day
}

console.log(method("10 200"))