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

function solution(string) {
    const rawData = string.split(`\n`);
    const [countOfGhosts, countOfQuestions] = rawData[0].split(" ").map(Number);
    const questions = rawData.slice(1);

    let ghosts = Array(countOfGhosts)
        .fill(0)
        .map((_) => {
            let obj = {};
            obj.band = null;
            obj.countOfBands = 1;
            return obj;
        });
    let wasBands = 0;
    let answers = [];

    // ghosts[0].band = 10;
    // console.log(ghosts);

    for (let quest of questions) {
        let [type, x, y] = quest.split(" ").map(Number);
        switch (type) {
            case 1:
                console.log("Добавление в банду");
                console.log(x, y);
                console.log(ghosts);
                if (!ghosts[x - 1].band && !ghosts[y - 1].band && ghosts[x - 1].band === ghosts[y - 1].band) {
                    break;
                }

                if (!ghosts[x - 1].band && ghosts[y - 1].band) {
                    ghosts[x - 1].band = JSON.stringify(JSON.parse(ghosts[y - 1].band));
                    ghosts[x - 1].countOfBands++;
                    break;
                }
                if (!ghosts[y - 1].band && ghosts[x - 1].band) {
                    ghosts[y - 1].band = JSON.stringify(JSON.parse(ghosts[x - 1].band));
                    ghosts[y - 1].countOfBands++;
                    break;
                }

                // Запоминаем банды в которых были призраки
                let bandX = JSON.parse(JSON.stringify(ghosts[x - 1].band));
                let bandY = JSON.parse(JSON.stringify(ghosts[y - 1].band));
                // У нас состоялась новая банда - увеличиваем количество банд
                wasBands++;
                // Приписываем этих призраков к этой банде и увеличиваем их счетчик
                ghosts[x - 1].band = wasBands;
                ghosts[x - 1].countOfBands++;

                ghosts[y - 1].band = wasBands;
                ghosts[y - 1].countOfBands++;

                // Если они не состояли в бандах то идем к следующему вопросу
                if (!bandX && !bandY) {
                    console.log(ghosts);
                    break;
                }

                // Записываем всех членов банд в новую банду
                for (let ghost of ghosts) {
                    if (ghost.band && ghost.band === bandX) ghost.band = wasBands;
                    if (ghost.band && ghost.band === bandY) ghost.band = wasBands;
                }
                console.log(ghosts);
                break;
            case 2:
                console.log("В одной банде??");
                console.log(x, y);
                console.log(ghosts);
                if (x === y) {
                    answers.push("YES");
                    console.log("YES");
                    break;
                }
                if (!ghosts[x - 1].band || !ghosts[y - 1].band) {
                    answers.push("NO");
                    console.log("NO");
                    break;
                }
                if (ghosts[x - 1].band === ghosts[y - 1].band) {
                    answers.push("YES");
                    console.log("YES");
                    break;
                } else {
                    answers.push("NO");
                    console.log("NO");
                    break;
                }

            case 3:
                console.log("Сколько раз был в банде?");
                console.log(x);
                console.log(ghosts);
                console.log(ghosts[x - 1].countOfBands);
                answers.push(ghosts[x - 1].countOfBands);
                break;
        }
    }

    console.log(answers.join(" "));

    return answers.join(" ");
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
