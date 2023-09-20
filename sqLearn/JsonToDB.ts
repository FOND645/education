const path = require("path");
import { sqlite3 } from "sqlite3";
const sqlite: sqlite3 = require("sqlite3");
const fs = require("fs");
import { dataBaseJSON } from "./types";

function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}.${minutes}.${seconds}`;
}

console.log(getCurrentDateTime());
const dbPath = path.resolve(__dirname, `NWR ${getCurrentDateTime()}.db`);
interface idsObject {
    [key: string]: number;
    count: number;
}
let materialsIDs: idsObject = {
    count: 0,
};
let devicesIDs: idsObject = {
    count: 0,
};
let blocksIDs: idsObject = {
    count: 0,
};
let defectsIDs: idsObject = {
    count: 0,
};
let actionsIDs: idsObject = {
    count: 0,
};
let organiztionsIDs = [
    {
        name: "144 БТРЗ",
        city: "Екатеринбург"
    },
    {
        name: "61 БТРЗ",
        city: "Санкт-Петербург"
    },
    {
        name: "81 БТРЗ",
        city: "Армавир"
    },
]
let contractsIDs: idsObject = {
    count: 0
}
let repairDevicesIDs: idsObject = {
    count: 0
}
let repairBlocksIDs: idsObject = {
    count: 0
}

const contractsPath: string = path.join(__dirname, `dataBases/contracts.json`);
const defectsPath: string = path.join(__dirname, `dataBases/defectsBase.json`);
const devicesPath: string = path.join(__dirname, `dataBases/devicesBase.json`);
const materialsPath: string = path.join(__dirname, `dataBases/materialsBase.json`);

const JSONdatabse: dataBaseJSON = {
    contracts: JSON.parse(fs.readFileSync(contractsPath, "utf-8")),
    defects: JSON.parse(fs.readFileSync(defectsPath, `utf-8`)),
    devices: JSON.parse(fs.readFileSync(devicesPath, `utf-8`)),
    materials: JSON.parse(fs.readFileSync(materialsPath, `utf-8`)),
};

let db = new sqlite.Database(dbPath);

let total = 0
let complite = 0

db.serialize(() => {
    total++
    db.run(
        `CREATE TABLE "materials" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL,
        "unit"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    );`,
        (err) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (err) console.log(`Ошибка при создании БД`, err);
        }
    );
    JSONdatabse.materials.forEach((material) => {
        const { name, key, unit } = material;
        let materialID: number | undefined;
        if (materialsIDs.hasOwnProperty(key)) {
            materialID = materialsIDs[key];
        } else {
            materialsIDs[key] = materialsIDs.count;
            materialID = materialsIDs.count;
            materialsIDs.count++;
        }
        total++
        db.run(`INSERT INTO materials (id, name, unit) VALUES (?, ?, ?)`, [materialID, name, unit], (error) => {
            if (error) {
                complite++
                console.log(`${complite} из ${total}`)
                console.log(`Ошибка при добавлении в бд`, error);
            } else {
                console.log(`Добавлен материал ID:${materialID}, name:${name}`);
            }
        });
    });

    // Создаем базу изделий
    total++
    db.run(
        `CREATE TABLE "devices" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL,
        "decimal"	TEXT NOT NULL,
        PRIMARY KEY ("id" AUTOINCREMENT)
    );`,
        (error) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log(error);
            } else {
                console.log("Создана таблица devices");
            }
        }
    );

    // Создаем базу блоков
    total++
    db.run(
        `CREATE TABLE "blocks" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL,
        "decimal"	TEXT NOT NULL,
        PRIMARY KEY ("id" AUTOINCREMENT)
    );`,
        (error) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log(error);
            } else {
                console.log("Создана таблица blocks");
            }
        }
    );

    // Создаем таблицу связей изделий и блоков
    total++
    db.run(
        `CREATE TABLE blocks_in_devices (
        "device_id" INTEGER NOT NULL,
        "block_id" INTEGER NOT NULL,
        PRIMARY KEY (device_id, block_id),
        FOREIGN KEY (device_id) REFERENCES devices(id),
        FOREIGN KEY (block_id) REFERENCES blocks(id)
    )`,
        (error) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log(error);
            } else {
                console.log("Создана таблица blocks_in_devices");
            }
        }
    );

    // Заполняем базу изделий
    JSONdatabse.devices.forEach((device) => {
        const { key, name, decimal } = device;
        let deviceID: undefined | number;
        if (devicesIDs.hasOwnProperty(key)) {
            deviceID = devicesIDs[key];
        } else {
            devicesIDs[key] = devicesIDs.count;
            deviceID = devicesIDs.count;
            devicesIDs.count++;
        }
        total++
        db.run("INSERT INTO devices (id, name, decimal) VALUES (?, ?, ?)", [deviceID, name, decimal], (error) => {

            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log("Ошибка при добавлении устройства", error);
            } else {
                console.log(`Добавлено устройство ID:${deviceID}, name:${name}`);
            }
        });

        // Добавляем это же устройство как блок
        let deviceBlockID: number | undefined;
        blocksIDs[key] = blocksIDs.count;
        deviceBlockID = blocksIDs.count;
        blocksIDs.count++;

        total++
        db.run("INSERT INTO blocks (id, name, decimal) VALUES (?, ?, ?)", [deviceBlockID, name, decimal], (error) => {

            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log("Ошибка при добавлении устройства в блоки", error);
            } else {
                console.log(`Добавлено устройство-блок ID:${deviceBlockID}, name:${name}`);
            }
        });

        // Создаем связь
        total++
        db.run("INSERT INTO blocks_in_devices (device_id, block_id) VALUES (?, ?)", [deviceID, deviceBlockID], (error) => {

            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log("Ошибка при создании связи Устройство - устройство в блоках", error);
            } else {
                console.log(`Добавлено связь Устройство - устройство в блоках ID:${deviceBlockID}, name:${name}`);
            }
        });

        // Заполняем базу блоков
        device.includes.forEach((block) => {
            const { key, name, decimal } = block;
            let blockID: undefined | number;
            if (blocksIDs.hasOwnProperty(key)) {
                blockID = blocksIDs[key];

                total++
                db.run("INSERT INTO blocks_in_devices (device_id, block_id) VALUES (?, ?)", [deviceID, blockID], (error) => {

                    complite++
                    console.log(`${complite} из ${total}`)
                    if (error) {
                        console.log("Ошибка при добавлении существующего блока", error);
                    } else {
                        console.log(`Добавлена связь: ${deviceID} - ${blockID}`);
                    }
                });
            } else {
                blocksIDs[key] = blocksIDs.count;
                blockID = blocksIDs.count;
                blocksIDs.count++;

                total++
                db.run("INSERT INTO blocks (id, name, decimal) VALUES (?, ?, ?)", [blockID, name, decimal], (error) => {

                    complite++
                    console.log(`${complite} из ${total}`)
                    if (error) {
                        console.log("Ошибка при добавлении нового блока", error);
                    } else {
                        console.log(`Добавлен блок ID:${blockID}, name:${name}`);
                    }
                });

                total++
                db.run("INSERT INTO blocks_in_devices (device_id, block_id) VALUES (?, ?)", [deviceID, blockID], (error) => {

                    complite++
                    console.log(`${complite} из ${total}`)
                    if (error) {
                        console.log("Ошибка при создании связи", error);
                    } else {
                        console.log(`Добавлена связь: ${deviceID} - ${blockID}`);
                    }
                });
            }
        });
    });

    // Создаем базу неисправностей

    total++
    db.run(
        `CREATE TABLE defects (
        "id" INTEGER NOT NULL UNIQUE,
        "description" TEXT NOT NULL,
        "defect" TEXT,
        "solution" TEXT,
        "block_id" INTEGER NOT NULL,
        FOREIGN KEY (block_id) REFERENCES blocks(id),
        PRIMARY KEY ("id" AUTOINCREMENT)
    )`,
        (error) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log("Ошибка при создании базы дефектов", error);
            } else {
                console.log("Создана база дефектов");
            }
        }
    );

    // Создаем базу действий

    total++
    db.run(
        `CREATE TABLE actions (
        "id" INTEGER NOT NULL UNIQUE,
        "action" TEXT NOT NULL,
        "index" TEXT NOT NULL,
        "defect_id" INTEGER NOT NULL,
        FOREIGN KEY (defect_id) REFERENCES defects(id),
        PRIMARY KEY ("id" AUTOINCREMENT)
    )`,
        (error) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log("Ошибка при создании базы действий", error);
            } else {
                console.log("Создана база действий");
            }
        }
    );

    // Создаем таблицу связи ДЕЙСТВИЕ - МАТЕРИАЛЫ

    total++
    db.run(
        `CREATE TABLE materials_in_actions (
        "action_id" INTEGER NOT NULL,
        "material_id" INTEGER NOT NULL,
        "count" FLOAT NOT NULL,
        PRIMARY KEY (action_id, material_id),
        FOREIGN KEY (action_id) REFERENCES actions(id),
        FOREIGN KEY (material_id) REFERENCES materials(id)
    )`,
        (error) => {
            complite++
            console.log(`${complite} из ${total}`)
            if (error) {
                console.log("Ошибка при создании таблицы связи ДЕЙСТВИЕ - МАТЕРИАЛЫ", error);
            } else {
                console.log("Создана таблица связи ДЕЙСТВИЕ - МАТЕРИАЛЫ");
            }
        }
    );

    // Создаем таблицу связи НЕИСПРАВНОСТЬ - ДЕЙСТВИЯ
    // db.run(
    //     `CREATE TABLE actions_in_defects (
    //     "defect_id" INTEGER NOT NULL,
    //     "action_id" INTEGER NOT NULL,
    //     PRIMARY KEY (action_id, defect_id),
    //     FOREIGN KEY (action_id) REFERENCES actions(id),
    //     FOREIGN KEY (defect_id) REFERENCES defects(id)
    // )`,
    //     (error) => {
    //         if (error) {
    //             console.log("Ошибка при создании таблицы связи ДЕЙСТВИЕ - МАТЕРИАЛЫ", error);
    //         } else {
    //             console.log("Создана таблица связи ДЕЙСТВИЕ - МАТЕРИАЛЫ");
    //         }
    //     }
    // );

    // Создаем таблицу связи БЛОК - НЕИСПРАВНОСТИ
    // db.run(
    //     `CREATE TABLE defects_in_blocks (
    //     "block_id" INTEGER NOT NULL,
    //     "defect_id" INTEGER NOT NULL,
    //     PRIMARY KEY (block_id, defect_id),
    //     FOREIGN KEY (block_id) REFERENCES blocks(id),
    //     FOREIGN KEY (defect_id) REFERENCES defects(id)
    // )`,
    //     (error) => {
    //         if (error) {
    //             console.log("Ошибка при создании таблицы связи БЛОКИ - НЕИСПРАВНОСТИ", error);
    //         } else {
    //             console.log("Создана таблица связи БЛОКИ - НЕИСПРАВНОСТИ");
    //         }
    //     }
    // );

    // Заполняем таблицу дефектов
    JSONdatabse.defects.forEach((Defect) => {
        const { deviceKey, description, defect, solution, actions } = Defect;
        const defectKey = Defect.key;
        let defectID: undefined | number;
        const blockID = blocksIDs[deviceKey];
        if (defectsIDs.hasOwnProperty(defectKey)) {
            defectID = defectsIDs[defectKey];
        } else {
            defectsIDs[defectKey] = defectsIDs.count;
            defectID = defectsIDs.count;
            defectsIDs.count++;
        }

        // Добавляем неисправность

        total++
        db.run(`INSERT INTO defects (id, description, defect, solution, block_id) VALUES (?, ?, ?, ?, ?)`, [defectID, description, defect, solution, blockID], (error) => {
            if (error) {
                complite++
                console.log(`${complite} из ${total}`)
                console.log("Ошибка при добавлении неисправности", error);
            } else {
                console.log(`Добавлена неисправность ID:${defectID}, name:${description}`);
            }
        });
        // db.run(`INSERT INTO defects_in_blocks (block_id, defect_id) VALUES (?, ?)`, [blockID, defectID], (error) => {
        //     if (error) {
        //         console.log("Ошибка при связывании БЛОК - НЕИСПРАВНОЕСТЬ", error);
        //     } else {
        //         console.log(`Добавлена связь ${defectID} - ${blockID}`);
        //     }
        // });
        actions.forEach((Action) => {
            const { index, action, materials } = Action;
            const actionKey = Action.key;
            let actionID: undefined | number;
            if (actionsIDs.hasOwnProperty(actionKey)) {
                actionID = actionsIDs[actionKey];
            } else {
                actionsIDs[actionKey] = actionsIDs.count;
                actionID = actionsIDs.count;
                actionsIDs.count++;
            }

            total++
            db.run(`INSERT INTO actions ("id", "action", "index", "defect_id") VALUES (?, ?, ?, ?)`, [actionID, action, index, defectID], (error) => {
                if (error) {
                    complite++
                    console.log(`${complite} из ${total}`)
                    console.log("Ошибка при добавлении действия", error);
                } else {
                    console.log(`Добавлено действие ID:${actionID}, name:${action}`);
                }
            });
            // db.run(`INSERT INTO actions_in_defects (action_id, defect_id) VALUES (?, ?)`, [actionID, defectID], (error) => {
            //     if (error) {
            //         console.log("Ошибка при связывании НЕИСПРАВНОЕСТЬ - ДЕЙСТВИЕ", error);
            //     } else {
            //         console.log(`Добавлена связь ${actionID} - ${blockID}`);
            //     }
            // });
            materials.forEach((Material) => {
                const { count, materialKey, key } = Material;
                const materialID = materialsIDs[materialKey];

                total++
                db.run(
                    `INSERT INTO materials_in_actions (action_id, material_id, count) VALUES (?, ?, ?)`,
                    [actionID, materialID, count],
                    (error) => {
                        complite++
                        console.log(`${complite} из ${total}`)
                        if (error) {
                            console.log("Ошибка при связывании ДЕЙСТВИЕ - МАТЕРИАЛ", error);
                        } else {
                            console.log(`Добавлена связь ${actionID} - ${materialID}`);
                        }
                    }
                );
            });
        });
    });

    // Создаем БД организаций

    total++
    db.run(`CREATE TABLE "organiztions" (
        "id"	INTEGER NOT NULL UNIQUE,
        "name"	TEXT NOT NULL,
        "city"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
    );`, (err) => {
        complite++
        console.log(`${complite} из ${total}`)
        if (err) {
            console.log(`Ошибка создания таблицы организаций`);
        } else {
            console.log(`Создана таблица организаций`)
        }
    })

    // Создаем БД контрактов

    total++
    db.run(`CREATE TABLE "contracts" (
        "id"	INTEGER NOT NULL UNIQUE,
        "number"	TEXT NOT NULL,
        "date"	TEXT NOT NULL,
        "organiztion_id"	INTEGER,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY (organiztion_id) REFERENCES organiztions(id)
    );`, (err) => {
        complite++
        console.log(`${complite} из ${total}`)
        if (err) {
            console.log(`Ошибка создания таблицы контрактов`);
        } else {
            console.log(`Создана таблица контрактов`)
        }
    })

    // Создаем БД устройств в ремонте

    total++
    db.run(`CREATE TABLE "repair_devices" (
        "id"	INTEGER NOT NULL UNIQUE,
        "contract_id"	INTEGER NOT NULL,
        "device_id"	INTEGER NOT NULL,
        "create_time"	INTEGER NOT NULL,
        "change_time"	INTEGER NOT NULL,
        "repair_number"	INTEGER NOT NULL,
        "serial_number"	TEXT NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY ("contract_id") REFERENCES contracts(id),
        FOREIGN KEY ("device_id") REFERENCES defects(id)
    );`, (err) => {
        complite++
        console.log(`${complite} из ${total}`)
        if (err) {
            console.log(`Ошибка создания таблицы устройств в ремонте`);
        } else {
            console.log(`Создана таблица устройств в ремонте`)
        }
    })

    // Создаем БД блоков в ремонте

    total++
    db.run(`CREATE TABLE "repair_blocks" (
        "id"	INTEGER NOT NULL UNIQUE,
        "block_id"	INTEGER NOT NULL,
        "serial_number"	TEXT NOT NULL,
        "count"	REAL NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT),
        FOREIGN KEY ("block_id") REFERENCES blocks(id)
    );`, (err) => {
        complite++
        console.log(`${complite} из ${total}`)
        if (err) {
            console.log(`Ошибка создания таблицы блоков в ремонте`);
        } else {
            console.log(`Создана таблица блоков в ремонте`)
        }
    })

    // Создаем таблицу связи БЛОК в ремонте - НЕИСПРАВНОСТИ

    total++
    db.run(
        `CREATE TABLE "defects_in_repair" (
            "repair_blocks_id" INTEGER NOT NULL,
            "defect_id" INTEGER NOT NULL,
            PRIMARY KEY (repair_blocks_id, defect_id),
            FOREIGN KEY (repair_blocks_id) REFERENCES repair_blocks(id),
            FOREIGN KEY (defect_id) REFERENCES defects(id)            
    )`, (err) => {
        complite++
        console.log(`${complite} из ${total}`)
        if (err) {
            console.log(`Ошибка создания таблицы связи БЛОК в ремонте - НЕИСПРАВНОСТИ`);
        } else {
            console.log(`Создана таблица связи БЛОК в ремонте - НЕИСПРАВНОСТИ`)
        }
    })

    organiztionsIDs.forEach((Organization, id) => {
        const { name, city } = Organization

        total++
        db.run('INSERT INTO organiztions ("id", "name", "city") VALUES (?, ?, ?)', [id, name, city], (err) => {

            complite++
            console.log(`${complite} из ${total}`)
            if (err) {
                console.log(`Ошибка добавления организации ${id} ${name} ${city}`, err);
            } else {
                console.log(`Добавлена организация ${id} ${name} ${city}`)
            }
        })
    })

    JSONdatabse.contracts.forEach(Contract => {
        const { organizationName, contractDate, contractNumber, repairBase } = Contract
        const ContractKey = Contract.key
        let contractID: undefined | number;
        if (contractsIDs.hasOwnProperty(ContractKey)) {
            contractID = contractsIDs[ContractKey];
        } else {
            contractsIDs[ContractKey] = contractsIDs.count;
            contractID = contractsIDs.count;
            contractsIDs.count++;
        }
        let organiztionID = organiztionsIDs.findIndex(org => org.name === organizationName)


        total++
        db.run(`INSERT INTO contracts ("id", "number", "date", "organiztion_id") VALUES (?, ?, ?, ?)`, [contractID, contractNumber, contractDate, organiztionID], (err) => {

            complite++
            console.log(`${complite} из ${total}`)
            if (err) {
                console.log(`Ошибка добавления контракта ${contractID} ${contractNumber} ${organiztionID}`, err);
            } else {
                console.log(`Добавлен контракт ${contractID} ${contractNumber} ${organiztionID}`)
            }
        })
        repairBase.forEach(RepairDevice => {
            const { changeTime, createTime, deviceKey, repairNumber, serialNumber, subDevices } = RepairDevice
            const RepairDeviceKey = RepairDevice.key
            const deviceID = devicesIDs[deviceKey]
            let repairDeviceID: undefined | number;
            if (repairDevicesIDs.hasOwnProperty(RepairDeviceKey)) {
                repairDeviceID = repairDevicesIDs[RepairDeviceKey];
            } else {
                repairDevicesIDs[RepairDeviceKey] = repairDevicesIDs.count;
                repairDeviceID = repairDevicesIDs.count;
                repairDevicesIDs.count++;
            }


            total++
            db.run(`INSERT INTO repair_devices ("id", "contract_id", "device_id", "create_time", "change_time", "repair_number", "serial_number") VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [repairDeviceID, contractID, deviceID, createTime, changeTime, repairNumber, serialNumber],
                (err) => {
                    complite++
                    console.log(`${complite} из ${total}`)
                    if (err) {
                        console.log(`Ошибка добавления устройства ремонта ${repairDeviceID}, ${contractID}, ${deviceID}, ${createTime}, ${changeTime}, ${repairNumber}, ${serialNumber}`, err);
                    } else {
                        console.log(`Добавлено устройство ремонта ${repairNumber} ${repairDevicesIDs} ${deviceID} ${serialNumber}`)
                    }
                })
            subDevices.forEach(Block => {
                const { subDeviceKey, serialNumber, count, defects } = Block
                const blockKey = Block.key
                const blockID = blocksIDs[subDeviceKey]
                let repairBlockID: undefined | number;
                if (repairBlocksIDs.hasOwnProperty(RepairDeviceKey)) {
                    repairBlockID = repairBlocksIDs[subDeviceKey];
                } else {
                    repairBlocksIDs[subDeviceKey] = repairBlocksIDs.count;
                    repairBlockID = repairBlocksIDs.count;
                    repairBlocksIDs.count++;
                }

                total++
                db.run(`INSERT INTO repair_blocks ("id", "block_id", "serial_number", "count") VALUES (?, ?, ?, ?)`,
                    [repairBlockID, blockID, serialNumber, count],
                    (err) => {
                        complite++
                        console.log(`${complite} из ${total}`)
                        if (err) {
                            console.log(`Ошибка добавления блока ремонта ${repairBlockID}, ${blockID}, ${serialNumber}, ${count}`, err);
                        } else {
                            console.log(`Добавлено блока ремонта ${blockID} ${serialNumber}`)
                        }
                    })
                defects.forEach(Defect => {
                    const defectID = defectsIDs[Defect]

                    total++
                    db.run(`INSERT INTO defects_in_repair ("repair_blocks_id", "defect_id") VALUES (?, ?)`,
                        [repairBlockID, defectID],
                        (err) => {
                            complite++
                            console.log(`${complite} из ${total}`)
                            if (err) {
                                console.log(`Ошибка добавления связи БЛОК ${repairBlockID} - НЕИСПРАВНОСТЬ ${defectID}`, err);
                            } else {
                                console.log(`Добавлена связь БЛОК ${repairBlockID} - НЕИСПРАВНОСТЬ ${defectID}`)
                            }
                        })
                })
            })
        })
    })

    // db.all(`SELECT `)
});
