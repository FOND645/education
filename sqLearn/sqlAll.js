"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var sqlite = require("sqlite3");
var dbPath = path.join(__dirname, "NWR.db");
var db = new sqlite.Database(dbPath);
var start = new Date().getTime();
db.all('SELECT ("defect_id") FROM "defects_in_blocks" WHERE "block_id" = "16"', function (error, result) {
    if (error) {
        console.log(error);
    }
    else {
        var mappedResult = result.map(function (res) { return res.defect_id; });
        db.all("SELECT (\"description\") FROM \"defects\" WHERE \"id\" IN (".concat(mappedResult.join(", "), ")"), function (error, result) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(result);
                var end = new Date().getTime();
                console.log(end - start);
            }
        });
    }
});
