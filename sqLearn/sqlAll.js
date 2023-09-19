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
        var defects = [];
        db.serialize(function () {
            result.forEach(function (res) {
                db.all("SELECT (\"description\") FROM \"defects\" WHERE \"id\" = ?", [res.defect_id], function (error, result) {
                    console.log(result);
                    var end = new Date().getTime();
                    console.log(end - start);
                });
            });
        });
    }
});
