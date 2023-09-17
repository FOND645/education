const { assert } = require("chai");

function solution(matrix, target) {
    if (matrix[0][0] > target) return false;
    if (matrix[matrix.length - 1][matrix[matrix.length - 1].length - 1] < target) return false;
    let strInd;
    for (let y = 0; y < matrix.length - 1; y++) {
        if (matrix[y + 1] === target) return true;

        if (matrix[y + 1][0] > target) {
            strInd = y;
            break;
        }
    }
    strInd = strInd ?? matrix.length - 1;
    return binarySearch(matrix[strInd], target);
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return true;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return false;
}

const tests = [
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
        ],
        target: 3,
        solution: true,
    },
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
        ],
        target: 13,
        solution: false,
    },
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
        ],
        target: 102,
        solution: false,
    },
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
        ],
        target: 1,
        solution: true,
    },
    {
        matrix: [
            [1, 3, 5, 7],
            [10, 11, 16, 20],
            [23, 30, 34, 60],
        ],
        target: 60,
        solution: true,
    },
];

describe("Проверка задания", function () {
    tests.forEach((test, index) => {
        it(`Тест № ${index + 1}`, function () {
            const result = solution(test.matrix, test.target);
            assert.equal(result, test.solution);
        });
    });
});
