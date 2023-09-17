"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var sqlite = require("sqlite3");
var fs = require("fs");
function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, "0");
    var day = String(now.getDate()).padStart(2, "0");
    var hours = String(now.getHours()).padStart(2, "0");
    var minutes = String(now.getMinutes()).padStart(2, "0");
    var seconds = String(now.getSeconds()).padStart(2, "0");
    return "".concat(year, ".").concat(month, ".").concat(day, " ").concat(hours, ".").concat(minutes, ".").concat(seconds);
}
console.log(getCurrentDateTime());
var dbPath = path.resolve(__dirname, "NWR ".concat(getCurrentDateTime(), ".db"));
var materialsIDs = {
    count: 0,
};
var devicesIDs = {
    count: 0,
};
var blocksIDs = {
    count: 0,
};
var defectsIDs = {
    count: 0,
};
var actionsIDs = {
    count: 0,
};
var contractsPath = path.join(__dirname, "dataBases/contracts.json");
var defectsPath = path.join(__dirname, "dataBases/defectsBase.json");
var devicesPath = path.join(__dirname, "dataBases/devicesBase.json");
var materialsPath = path.join(__dirname, "dataBases/materialsBase.json");
var JSONdatabse = {
    contracts: JSON.parse(fs.readFileSync(contractsPath, "utf-8")),
    defects: JSON.parse(fs.readFileSync(defectsPath, "utf-8")),
    devices: JSON.parse(fs.readFileSync(devicesPath, "utf-8")),
    materials: JSON.parse(fs.readFileSync(materialsPath, "utf-8")),
};
var db = new sqlite.Database(dbPath);
db.serialize(function () {
    db.run("CREATE TABLE \"materials\" (\n        \"id\"\tINTEGER NOT NULL UNIQUE,\n        \"name\"\tTEXT NOT NULL,\n        \"unit\"\tTEXT NOT NULL,\n        PRIMARY KEY(\"id\" AUTOINCREMENT)\n    );", function (err) {
        if (err)
            console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0438 \u0411\u0414", err);
    });
    JSONdatabse.materials.forEach(function (material) {
        var name = material.name, key = material.key, unit = material.unit;
        var materialID;
        if (materialsIDs.hasOwnProperty(key)) {
            materialID = materialsIDs[key];
        }
        else {
            materialsIDs[key] = materialsIDs.count;
            materialID = materialsIDs.count;
            materialsIDs.count++;
        }
        db.run("INSERT INTO materials (id, name, unit) VALUES (?, ?, ?)", [materialID, name, unit], function (error) {
            if (error) {
                console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0432 \u0431\u0434", error);
            }
            else {
                console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B ID:".concat(materialID, ", name:").concat(name));
            }
        });
    });
    // Создаем базу изделий
    db.run("CREATE TABLE \"devices\" (\n        \"id\"\tINTEGER NOT NULL UNIQUE,\n        \"name\"\tTEXT NOT NULL,\n        \"decimal\"\tTEXT NOT NULL,\n        PRIMARY KEY (\"id\" AUTOINCREMENT)\n    );", function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Создана таблица devices");
        }
    });
    // Создаем базу блоков
    db.run("CREATE TABLE \"blocks\" (\n        \"id\"\tINTEGER NOT NULL UNIQUE,\n        \"name\"\tTEXT NOT NULL,\n        \"decimal\"\tTEXT NOT NULL,\n        PRIMARY KEY (\"id\" AUTOINCREMENT)\n    );", function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Создана таблица blocks");
        }
    });
    // Создаем таблицу связей изделий и блоков
    db.run("CREATE TABLE blocks_in_devices (\n        \"device_id\" INTEGER NOT NULL,\n        \"block_id\" INTEGER NOT NULL,\n        PRIMARY KEY (device_id, block_id),\n        FOREIGN KEY (device_id) REFERENCES devices(id),\n        FOREIGN KEY (block_id) REFERENCES blocks(id)\n    )", function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log("Создана таблица blocks_in_devices");
        }
    });
    // Заполняем базу изделий
    JSONdatabse.devices.forEach(function (device) {
        var key = device.key, name = device.name, decimal = device.decimal;
        var deviceID;
        if (devicesIDs.hasOwnProperty(key)) {
            deviceID = devicesIDs[key];
        }
        else {
            devicesIDs[key] = devicesIDs.count;
            deviceID = devicesIDs.count;
            devicesIDs.count++;
        }
        db.run("INSERT INTO devices (id, name, decimal) VALUES (?, ?, ?)", [deviceID, name, decimal], function (error) {
            if (error) {
                console.log("Ошибка при добавлении устройства", error);
            }
            else {
                console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E ID:".concat(deviceID, ", name:").concat(name));
            }
        });
        // Добавляем это же устройство как блок
        var deviceBlockID;
        blocksIDs[key] = blocksIDs.count;
        deviceBlockID = blocksIDs.count;
        blocksIDs.count++;
        db.run("INSERT INTO blocks (id, name, decimal) VALUES (?, ?, ?)", [deviceBlockID, name, decimal], function (error) {
            if (error) {
                console.log("Ошибка при добавлении устройства в блоки", error);
            }
            else {
                console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E-\u0431\u043B\u043E\u043A ID:".concat(deviceBlockID, ", name:").concat(name));
            }
        });
        // Создаем связь
        db.run("INSERT INTO blocks_in_devices (device_id, block_id) VALUES (?, ?)", [deviceID, deviceBlockID], function (error) {
            if (error) {
                console.log("Ошибка при создании связи Устройство - устройство в блоках", error);
            }
            else {
                console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0441\u0432\u044F\u0437\u044C \u0423\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E - \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E \u0432 \u0431\u043B\u043E\u043A\u0430\u0445 ID:".concat(deviceBlockID, ", name:").concat(name));
            }
        });
        // Заполняем базу блоков
        device.includes.forEach(function (block) {
            var key = block.key, name = block.name, decimal = block.decimal;
            var blockID;
            if (blocksIDs.hasOwnProperty(key)) {
                blockID = blocksIDs[key];
                db.run("INSERT INTO blocks_in_devices (device_id, block_id) VALUES (?, ?)", [deviceID, blockID], function (error) {
                    if (error) {
                        console.log("Ошибка при добавлении существующего блока", error);
                    }
                    else {
                        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0441\u0432\u044F\u0437\u044C: ".concat(deviceID, " - ").concat(blockID));
                    }
                });
            }
            else {
                blocksIDs[key] = blocksIDs.count;
                blockID = blocksIDs.count;
                blocksIDs.count++;
                db.run("INSERT INTO blocks (id, name, decimal) VALUES (?, ?, ?)", [blockID, name, decimal], function (error) {
                    if (error) {
                        console.log("Ошибка при добавлении нового блока", error);
                    }
                    else {
                        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0431\u043B\u043E\u043A ID:".concat(blockID, ", name:").concat(name));
                    }
                });
                db.run("INSERT INTO blocks_in_devices (device_id, block_id) VALUES (?, ?)", [deviceID, blockID], function (error) {
                    if (error) {
                        console.log("Ошибка при создании связи", error);
                    }
                    else {
                        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0441\u0432\u044F\u0437\u044C: ".concat(deviceID, " - ").concat(blockID));
                    }
                });
            }
        });
    });
    // Создаем базу неисправностей
    db.run("CREATE TABLE defects (\n        \"id\" INTEGER NOT NULL UNIQUE,\n        \"description\" TEXT NOT NULL,\n        \"defect\" TEXT,\n        \"solution\" TEXT,\n        PRIMARY KEY (\"id\" AUTOINCREMENT)\n    )", function (error) {
        if (error) {
            console.log("Ошибка при создании базы дефектов", error);
        }
        else {
            console.log("Создана база дефектов");
        }
    });
    // Создаем базу действий
    db.run("CREATE TABLE actions (\n        \"id\" INTEGER NOT NULL UNIQUE,\n        \"action\" TEXT NOT NULL,\n        \"index\" TEXT NOT NULL,\n        PRIMARY KEY (\"id\" AUTOINCREMENT)\n    )", function (error) {
        if (error) {
            console.log("Ошибка при создании базы действий", error);
        }
        else {
            console.log("Создана база действий");
        }
    });
    // Создаем таблицу связи ДЕЙСТВИЕ - МАТЕРИАЛЫ
    db.run("CREATE TABLE materials_in_actions (\n        \"action_id\" INTEGER NOT NULL,\n        \"material_id\" INTEGER NOT NULL,\n        \"count\" FLOAT NOT NULL,\n        PRIMARY KEY (action_id, material_id),\n        FOREIGN KEY (action_id) REFERENCES actions(id),\n        FOREIGN KEY (material_id) REFERENCES materials(id)\n    )", function (error) {
        if (error) {
            console.log("Ошибка при создании таблицы связи ДЕЙСТВИЕ - МАТЕРИАЛЫ", error);
        }
        else {
            console.log("Создана таблица связи ДЕЙСТВИЕ - МАТЕРИАЛЫ");
        }
    });
    // Создаем таблицу связи НЕИСПРАВНОСТЬ - ДЕЙСТВИЯ
    db.run("CREATE TABLE actions_in_defects (\n        \"defect_id\" INTEGER NOT NULL,\n        \"action_id\" INTEGER NOT NULL,\n        PRIMARY KEY (action_id, defect_id),\n        FOREIGN KEY (action_id) REFERENCES actions(id),\n        FOREIGN KEY (defect_id) REFERENCES defects(id)\n    )", function (error) {
        if (error) {
            console.log("Ошибка при создании таблицы связи ДЕЙСТВИЕ - МАТЕРИАЛЫ", error);
        }
        else {
            console.log("Создана таблица связи ДЕЙСТВИЕ - МАТЕРИАЛЫ");
        }
    });
    // Создаем таблицу связи БЛОК - НЕИСПРАВНОСТИ
    db.run("CREATE TABLE defects_in_blocks (\n        \"block_id\" INTEGER NOT NULL,\n        \"defect_id\" INTEGER NOT NULL,\n        PRIMARY KEY (block_id, defect_id),\n        FOREIGN KEY (block_id) REFERENCES blocks(id),\n        FOREIGN KEY (defect_id) REFERENCES defects(id)\n    )", function (error) {
        if (error) {
            console.log("Ошибка при создании таблицы связи БЛОКИ - НЕИСПРАВНОСТИ", error);
        }
        else {
            console.log("Создана таблица связи БЛОКИ - НЕИСПРАВНОСТИ");
        }
    });
    // Заполняем таблицу дефектов
    JSONdatabse.defects.forEach(function (Defect) {
        var deviceKey = Defect.deviceKey, description = Defect.description, defect = Defect.defect, solution = Defect.solution, actions = Defect.actions;
        var defectKey = Defect.key;
        var defectID;
        var blockID = blocksIDs[deviceKey];
        if (defectsIDs.hasOwnProperty(defectKey)) {
            defectID = defectsIDs[defectKey];
        }
        else {
            defectsIDs[defectKey] = defectsIDs.count;
            defectID = defectsIDs.count;
            defectsIDs.count++;
        }
        // Добавляем неисправность
        db.run("INSERT INTO defects (id, description, defect, solution) VALUES (?, ?, ?, ?)", [defectID, description, defect, solution], function (error) {
            if (error) {
                console.log("Ошибка при добавлении неисправности", error);
            }
            else {
                console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u043D\u0435\u0438\u0441\u043F\u0440\u0430\u0432\u043D\u043E\u0441\u0442\u044C ID:".concat(defectID, ", name:").concat(description));
            }
        });
        db.run("INSERT INTO defects_in_blocks (block_id, defect_id) VALUES (?, ?)", [blockID, defectID], function (error) {
            if (error) {
                console.log("Ошибка при связывании БЛОК - НЕИСПРАВНОЕСТЬ", error);
            }
            else {
                console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0441\u0432\u044F\u0437\u044C ".concat(defectID, " - ").concat(blockID));
            }
        });
        actions.forEach(function (Action) {
            var index = Action.index, action = Action.action, materials = Action.materials;
            var actionKey = Action.key;
            var actionID;
            if (actionsIDs.hasOwnProperty(actionKey)) {
                actionID = actionsIDs[actionKey];
            }
            else {
                actionsIDs[actionKey] = actionsIDs.count;
                actionID = actionsIDs.count;
                actionsIDs.count++;
            }
            db.run("INSERT INTO actions (\"id\", \"action\", \"index\") VALUES (?, ?, ?)", [actionID, action, index], function (error) {
                if (error) {
                    console.log("Ошибка при добавлении действия", error);
                }
                else {
                    console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 ID:".concat(actionID, ", name:").concat(action));
                }
            });
            db.run("INSERT INTO actions_in_defects (action_id, defect_id) VALUES (?, ?)", [actionID, defectID], function (error) {
                if (error) {
                    console.log("Ошибка при связывании НЕИСПРАВНОЕСТЬ - ДЕЙСТВИЕ", error);
                }
                else {
                    console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0441\u0432\u044F\u0437\u044C ".concat(actionID, " - ").concat(blockID));
                }
            });
            materials.forEach(function (Material) {
                var count = Material.count, materialKey = Material.materialKey, key = Material.key;
                var materialID = materialsIDs[materialKey];
                db.run("INSERT INTO materials_in_actions (action_id, material_id, count) VALUES (?, ?, ?)", [actionID, materialID, count], function (error) {
                    if (error) {
                        console.log("Ошибка при связывании ДЕЙСТВИЕ - МАТЕРИАЛ", error);
                    }
                    else {
                        console.log("\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0430 \u0441\u0432\u044F\u0437\u044C ".concat(actionID, " - ").concat(materialID));
                    }
                });
            });
        });
    });
});
