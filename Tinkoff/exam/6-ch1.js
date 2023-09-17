const { assert } = require("chai");

var readline = require("readline");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
let rawData = [];

rl.on("line", function (data) {
    if (rawData.length === 0) {
        const [countOfGhosts, countOfQuestions] = data.split(" ").map(Number);
        rawData.push({ countOfGhosts, countOfQuestions });
    }
    rawData.push(data.split(" ").map(Number));
    if (rawData.length - 1 === rawData[0].countOfQuestions) {
        console.log(solution(rawData));
    }
});

function solution(rawData) {
    const [n, m] = rawData[0];
    const queries = rawData.slice(1);
    const parent = new Array(n + 1).fill(0).map((_, i) => i); // Изначально каждый дух в своей банде
    const bandCount = new Array(n + 1).fill(1); // Изначально каждый дух посетил одну банду

    function find(x) {
        if (x === parent[x]) return x;
        return (parent[x] = find(parent[x]));
    }

    function union(x, y) {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            parent[rootX] = rootY;
            bandCount[rootY] += bandCount[rootX];
        }
    }

    const results = [];

    for (let i = 0; i < m; i++) {
        const [type, x, y] = queries[i];
        if (type === 1) {
            union(x, y);
        } else if (type === 2) {
            results.push(find(x) === find(y) ? "YES" : "NO");
        } else if (type === 3) {
            results.push(bandCount[find(x)]);
        }
    }

    return results;
}

const tests = [
    {
        rawData: `7 13\n2 3 1\n3 3\n1 2 4\n2 1 1\n3 4\n2 3 4\n1 3 4\n3 4\n1 7 3\n1 1 3\n3 7\n3 1\n2 7 4`,
        solution: 10,
    },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.rawData);
            assert.equal(result, test.solution);
        });
    });
});
