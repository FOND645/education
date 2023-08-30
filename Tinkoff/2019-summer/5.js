const { assert } = require("chai")


function method(inp) {
    const regularExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
    return regularExp.test(inp)
}

describe("Проверка задания", function() {
    it("Слишком короткий пароль", function() {
        const input = "42pW4wS"
        const expectedReuslt = false
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Нет ЗАГЛАВНЫХ букв", function() {
        const input = "412waqqr24421"
        const expectedReuslt = false
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Нет строчных букв", function() {
        const input = "DSFE215SS21S"
        const expectedReuslt = false
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Нет цифр", function() {
        const input = "nfaeifaEFPWQ"
        const expectedReuslt = false
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Хороший пароль 1", function() {
        const input = "afpw21424SSSAQ21S"
        const expectedReuslt = true
        const result = method(input)
        assert.equal(result, expectedReuslt)
    })
    it("Хороший пароль 2", function() {
        const input = "DAWSw21s22ss"
        const expectedReuslt = true
        const result = method(input)
        assert.equal(result, expectedReuslt)
    })
})

