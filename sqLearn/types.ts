export type materialJSON = {
    name: string;
    unit: string;
    key: string;
};
export type materialsJSON = materialJSON[];

// Договоры
export type repairBlockJSON = {
    key: string;
    subDeviceKey: string;
    serialNumber: string;
    parent: string;
    defects: string[];
    count: number;
};
export type repairDeviceJSON = {
    key: string;
    createTime: number;
    changeTime: number;
    deviceKey: string;
    repairNumber: number;
    serialNumber: string;
    subDevices: repairBlockJSON[];
};
export type contractJSON = {
    organizationName: string;
    contractDate: string;
    contractNumber: string;
    key: string;
    repairBase: repairDeviceJSON[];
};
export type contractsJSON = contractJSON[];

// Дефекты
export type actionMaterialJSON = {
    materialKey: string;
    count: number;
    key: string;
};
export type defectActionJSON = {
    key: string;
    index: string;
    action: string;
    materials: actionMaterialJSON[];
};
export type defectJSON = {
    defect: string;
    solution: string;
    description: string;
    key: string;
    deviceKey: string;
    actions: defectActionJSON[];
};
export type defectsJSON = defectJSON[];

// Устройства
export type blockJSON = {
    name: string;
    decimal: string;
    key: string;
};
export type deviceJSON = blockJSON & {
    includes: blockJSON[];
};
export type devicesJSON = deviceJSON[];

export type dataBaseJSON = {
    contracts: contractsJSON;
    devices: devicesJSON;
    materials: materialsJSON;
    defects: defectsJSON;
};
