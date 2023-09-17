import express from "express";
import { sqlite3 } from "sqlite3";

const server = express();
const path = require("path");
const sqlite: sqlite3 = require("sqlite3");

import { dataBaseJSON } from "./types";
