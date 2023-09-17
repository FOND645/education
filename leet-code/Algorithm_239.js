const { assert } = require("chai");

function solution(nums, k) {
    let maximums = Array(nums.length - k + 1);

    for (let startPos = 0; startPos <= nums.length - k; startPos++) {
        maximums[startPos] = Math.max(...nums.slice(startPos, startPos + k));
    }
    return maximums;
}

function cached() {
    let cache = {};
}

const tests = [{ nums: [1, 3, -1, -3, 5, 3, 6, 7], k: 3, solution: [3, 3, 5, 5, 6, 7] }];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.nums, test.k);
            assert.equal(result, test.solution);
        });
    });
});
