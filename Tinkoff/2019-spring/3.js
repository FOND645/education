const { assert } = require("chai")

function solution(string) {
    string = string.replace(/\^-/, "^#")
    let [parsedExp1, parsedExp2] = [...string.split(`\n`).map(str => parseExpasion(str))]
    let multiplyExpressions = multiply(parsedExp1, parsedExp2)
    let sumartExpression = summary(multiplyExpressions)
    let result = ""
    sumartExpression.forEach(exp => {
        let k
        if (exp.k == 1) k = "+"
        else if (exp.k == -1) k = "-"
        else if (exp.k >= 0) k = `+${exp.k}`
        else {k = exp.k}
        let pow
        if (exp.p == 0) pow = ""
        else if (exp.p == 1) pow = "x"
        else pow = `x^${exp.p}`
        result+=`${k}${pow}`
    })
    result = result == "+" ? "+1" : result
    return result.slice(1)
}

function summary(expression) {
    let summedObj = {}
    expression.forEach(exp => {
        if (summedObj.hasOwnProperty(exp.p)) {
            summedObj[exp.p] += exp.k
        } else {
            summedObj[exp.p] = exp.k
        }
    })
    let result = []
    for (let p in summedObj) {
        result.push({k: summedObj[p], p: p})
    }
    result = result.sort((a, b) => b.p - a.p)
    return result
}

function multiply(expression1, expression2) {
    let multiplyExpressions = []
    expression1.forEach(exp1 => {
        expression2.forEach(exp2 => {
            let result = {k: exp1.k, p: exp1.p}
            result.k = result.k * exp2.k
            result.p = result.p + exp2.p
            multiplyExpressions.push(result)
        })
    })
    return multiplyExpressions
}

function parseExpasion(stirng) {
    let parsedExpasion = stirng.split(/(?=[+-])/).map(exp => {
        if (exp[0] != "-" && exp[0] != "+") exp = `+${exp}`
        return exp
    })
    return parsedExpasion.map(elem => {
        let result = { k: 0, p: 0 }
        if (!elem.includes("x")) {
            return { k: +elem, p: 0 }
        } else {
            if (!elem.includes("^")) {
                result.p = 1
                if (isNaN(parseInt(elem))) {
                    result.k = elem[0] == "-" ? -1 : 1
                } else {
                    result.k = parseInt(elem)
                }
            } else {
                const splitedElemet = elem.split("x^")
                if (isNaN(parseInt(splitedElemet[0]))) {
                    result.k = splitedElemet[0] == "-" ? -1 : 1
                } else result.k = splitedElemet[0]
                result.p = +(splitedElemet[1].replace("#", "-"))
            }
        }
        return result
    })
}

describe("Проверка задания", function () {
    it("Из задания", function() {
        const input = "x+2\nx^3-x^2+1"
        const expectedReuslt = "x^4+x^3-2x^2+x+2"
        const result = solution(input)
        assert.equal(result, expectedReuslt)
    });
    it("Проверка на отрицательные степени", function() {
        const input = "x^-10\nx^12"
        const expectedReuslt = "x^2"
        const result = solution(input)
        assert.equal(result, expectedReuslt)
    });
    it("Проверка на единицу в ответе", function() {
        const input = "1\n1"
        const expectedReuslt = "1"
        const result = solution(input)
        assert.equal(result, expectedReuslt)
    });

})