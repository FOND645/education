const { assert } = require("chai");

function solution(nums, target) {
    if (nums[0] === target) return 0;
    if (nums[0] > target) {
        for (let i = nums.length - 1; i !== -1; i--) {
            if (nums[i] == target) return i;
        }
        return -1;
    } else {
        for (let i = 0; i < nums.length; i++) {
            if (nums[i] == target) return i;
        }
        return -1;
    }
}

const tests = [
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 0, solution: 4 },
    { nums: [4, 5, 6, 7, 0, 1, 2], target: 3, solution: -1 },
    { nums: [1], target: 0, solution: -1 },
    { nums: [1, 3], target: 3, solution: 1 },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.nums, test.target);
            assert.equal(result, test.solution);
        });
    });
});
