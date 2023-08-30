const inputData = `15
4  7  9`

function solution(inputData) {
    const rawData = [...inputData.split(`\n`)]
    const targetSum = + rawData[0]
    const coinsNominal = rawData[1].split("  ").map(n => +n).sort()

    let options = new Set()
    options.add(1)

    function recursion(sum, coin) {
        sum += coin
        if (sum > targetSum) {
            return
        } 
        options.add(sum)
        if (sum == targetSum) return
        coinsNominal.forEach(coin => {
            recursion(sum, coin)
        })
    }
    coinsNominal.forEach(coin => {
        recursion(1, coin)
    })
    return Array.from(options).length
}

console.log(solution(inputData))