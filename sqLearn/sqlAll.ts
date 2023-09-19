
const path = require("path");
import { sqlite3 } from "sqlite3";
const sqlite: sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "NWR.db")

let db = new sqlite.Database(dbPath);

type defectQuery = { defect_id: number }[]
const start = new Date().getTime()
db.all('SELECT ("defect_id") FROM "defects_in_blocks" WHERE "block_id" = "16"', (error, result: defectQuery) => {
    if (error) {
        console.log(error)
    } else {
        let defects = []
        db.serialize(() => {
            result.forEach(res => {
                db.all(`SELECT ("description") FROM "defects" WHERE "id" = ?`, [res.defect_id], (error, result) => {
                    console.log(result)
                    const end = new Date().getTime()
                    console.log(end - start)
                })
            })
        })
    }
})