const { assert } = require("chai")


function method(inp) {
    const N = +inp
    if (N % 2 == 0) return 2
    let divider = 3
    const dividerLimit = Math.sqrt(N)
    while (divider <= dividerLimit) {
        if (N % divider == 0) return divider
        divider += 2
    }
    return N
}

describe("Проверка задания", function() {
    it("Тест из задания", function() {
        const input = "6"
        const expectedReuslt = 2
        const result = method(input)
        assert.equal(result, expectedReuslt)
    })
    it("Тест из задания", function() {
        const input = "2"
        const expectedReuslt = 2
        const result = method(input)
        assert.equal(result, expectedReuslt)
    })
    it("Производительность. Адок.", function() {
        const input = "999999937"
        const expectedReuslt = 999999937
        const result = method(input)
        assert.equal(result, expectedReuslt)
    })
})

