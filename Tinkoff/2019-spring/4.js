function solution(stirng) {
    let nums = stirng.split("").map(ch => {
        if (ch == "(") return 1
        else if (ch == ")") return -1
        else return 0
    })

    function replaceAndReturn() {
        
    }

}

function checkCahin(arr) {
    let openedCount = 0
    for (let el of arr) {
        openedCount += el
        if (openedCount < 0) return false
    }
    return openedCount == 0 
}

console.log(checkCahin("()(())"))