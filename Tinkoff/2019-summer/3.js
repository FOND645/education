const { assert } = require("chai")

function method(string) {
    let arr = string.split(`\n`)
    const countOfPoints = arr.shift()
    if (countOfPoints < 3) return "NO"
    if (countOfPoints == 3) return
    arr = arr.map(element => {
        const vals = element.split(" ")
        return { x: vals[0], y: vals[1] }
    })
    let mainTriangleSquare
    let result

    const lineLength = (A, B) => Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2))
    // console.log("Points:", arr)
    for (let p1 = 0; p1 <= arr.length - 3; p1++) {
        for (let p2 = p1 + 1; p2 <= arr.length - 2; p2++) {
            for (let p3 = p2 + 1; p3 <= arr.length - 1; p3++) {
                mainTriangleSquare = geron(arr[p1], arr[p2], arr[p3])
                if (mainTriangleSquare == 0) {
                    // console.log("Треугольник", arr[p1], arr[p2], arr[p3], "вырожден")
                    continue
                }

                result = arr.every((point, index) => {
                    if (index == p1 || index == p2 || index == p3) return true
                    if (point.x == arr[p1].x && point.y == arr[p1].y) return true
                    if (point.x == arr[p2].x && point.y == arr[p2].y) return true
                    if (point.x == arr[p3].x && point.y == arr[p3].y) return true
                    const triangle1 = geron(point, arr[p2], arr[p3])
                    const triangle2 = geron(arr[p1], point, arr[p3])
                    const triangle3 = geron(arr[p1], arr[p2], point)
                    // console.log("-------------------")
                    // console.log("Triangle:", arr[p1], arr[p2], arr[p3])
                    // console.log("Point:", point)
                    // console.log("mainTriangleSquare", mainTriangleSquare)
                    // console.log("triangle1", triangle1)
                    // console.log("triangle2", triangle2)
                    // console.log("triangle3", triangle3)
                    // console.log("sum of triangles", triangle1 + triangle2 + triangle3)
                    if (mainTriangleSquare == triangle1 + triangle2 + triangle3) return false
                    return true
                })
                if (result) return "YES"
            }
        }
    }

    function geron(A, B, C) {
        const AB = lineLength(A, B)
        const BC = lineLength(C, B)
        const AC = lineLength(A, C)
        const p = (AB + BC + AC) / 2
        const totalSquare = Math.sqrt(p * (p - AB) * (p - BC) * (p - AC))
        return Math.round(totalSquare * 100000) / 100000
    }

    return "NO"
}

describe("Проверка задания", function () {    
    it("Тест из задания - 2 совпадающие точки", function () {
        const input = `4\n5 5\n5 6\n5 6\n6 6`
        const expectedReuslt = "YES"
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Тест 1", function () {
        const input = `4\n1 1\n3 2\n5 3\n4 4`
        const expectedReuslt = "YES"
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Тест 2", function () {
        const input = `5\n0 0\n1 1\n3 4\n5 6\n6 7`
        const expectedReuslt = "YES"
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Тест 3", function () {
        const input = `5\n2 2\n4 4\n5 5\n7 7\n9 9`
        const expectedReuslt = "NO"
        const result = method(input)
        assert.equal(result, expectedReuslt)
    })
    it("Вырожденные треугольник", function () {
        const input = `4\n1 1\n2 2\n3 3\n4 4`
        const expectedReuslt = "NO"
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Точка на стороне треугольника", function () {
        const input = `4\n1 1\n3 3\n5 5\n4 4`
        const expectedReuslt = "YES"
        const result = method(input)
        assert.equal(result, expectedReuslt)
    });
    it("Тест на производительность", function () {
        const input = `100\n6 10\n7 8\n6 7\n5 6\n6 1\n1 8\n6 5\n2 7\n6 5\n9 9\n9 10\n1 10\n3 9\n2 7\n1 1\n6 10\n2 1\n1 5\n1 3\n5 10\n6 9\n7 3\n6 8\n3 8\n2 6\n5 7\n10 6\n6 7\n6 4\n3 6\n7 8\n3 7\n9 9\n10 3\n9 8\n9 6\n5 1\n7 3\n8 10\n10 5\n1 8\n3 4\n3 2\n8 6\n3 9\n1 4\n10 4\n8 4\n5 6\n5 2\n9 6\n5 3\n9 7\n10 1\n3 7\n6 7\n4 2\n2 1\n4 10\n3 6\n7 5\n9 10\n5 8\n10 4\n3 8\n2 1\n4 1\n7 5\n1 1\n5 5\n9 8\n6 9\n2 5\n5 4\n7 9\n1 5\n1 2\n4 2\n8 8\n2 3\n9 6\n1 2\n1 2\n9 6\n5 3\n6 3\n2 10\n5 9\n9 1\n7 4\n5 7\n3 10\n4 4\n1 4\n9 6\n1 8\n8 2\n9 8\n5 9\n1 5`
        const result = method(input)
        assert.isString(result, "Ответ не могу проверить...")
    })
})

