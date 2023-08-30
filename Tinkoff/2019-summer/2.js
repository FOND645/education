const inputString =
    `6
1
2
3
4
5`

function metdod(input) {
    let arr = input.split(`\n`)
    arr.shift()
    arr = arr.map(n => +n)    
    let value =  arr[0] == 0 ? 2 : 1
    while (true) {
        if (arr.every((rest, divider) => value % (divider + 2) == rest)) {
            return value
        } else {
            value = value + 2
        }
    }
}

console.log(metdod(inputString))