"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class DB {
    constructor() {
        dotenv_1.default.config();
        this.pool = mysql2_1.default.createPool({
            host: process.env.DB_HOST || "localhost",
            user: process.env.DB_USER || "root",
            password: process.env.DB_PASSWORD || "",
            database: process.env.DB_NAME || "squid",
            connectionLimit: 10,
            maxIdle: 10,
        });
    }
    query(sql) {
        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, results) => {
                if (err) {
                    reject(new Error("Error retrieving data from database"));
                }
                resolve(results);
            });
        });
    }
}
exports.default = DB;
/*
const database = new DB();
database
  .query("SELECT * FROM squid.businesses")
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.error("Error occurred:", err);
  });
*/
