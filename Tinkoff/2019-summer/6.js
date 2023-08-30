const inputData =
    `3 4
abcd
efdg
hijk
4`

function method(data) {
    let matrix = data.split(`\n`)
    const L = +matrix.pop() - 1
    const size = matrix.shift().split(" ")
    matrix = matrix.map(str => str.split(""))

    let passwords = []

    fillPassword({ x: 0, y: 0 }, "")

    function fillPassword(startPosition, currentWord) {
        let { x, y } = startPosition
        currentWord = currentWord + matrix[y][x]
        if (x == size[1] - 1 && y == size[0] - 1) {
            passwords.push(currentWord)
            return
        }
        if (x != size[1] - 1) { fillPassword({ x: x + 1, y: y }, currentWord) }
        if (y != size[0] - 1) { fillPassword({ x: x, y: y + 1 }, currentWord) }
    }

    passwords.sort()
    return passwords[L]
}

console.log(method(inputData))