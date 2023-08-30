function solution(str) {
    let N = +str

    let result = 0
    while (N > 1) {
        N = N / 2
        result++
    }
    return result
}

console.log(solution(5))