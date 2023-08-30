function getMaxSumIncrease(n, k, numbers) {
    let numCount = new Array(10).fill(0);
    let maxDigit = 9;

    for (let num of numbers) {
        while (num > 0) {
            numCount[num % 10]++;
            num = Math.floor(num / 10);
        }
    }

    let totalIncrease = 0;

    for (let i = 0; i < k; i++) {
        while (numCount[maxDigit] === 0 && maxDigit > 0) {
            maxDigit--;
        }

        if (maxDigit === 0) {
            break;
        }

        totalIncrease += maxDigit;
        numCount[maxDigit]--;
    }

    return totalIncrease;
}

// Пример использования
const input = "5 2\n1 2 1 3 4";
const lines = input.split("\n");
const [n, k] = lines[0].split(" ").map(Number);
const numbers = lines[1].split(" ").map(Number);

const result = getMaxSumIncrease(n, k, numbers);
console.log(result);