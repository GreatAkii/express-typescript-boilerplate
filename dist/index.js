"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./db"));
const pino_1 = __importDefault(require("pino"));
const pino_http_1 = __importDefault(require("pino-http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const database = new db_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log(`> running in ${app.get("env")} mode`);
if (app.get("env") === "development") {
    const logger = (0, pino_1.default)();
    app.use((0, pino_http_1.default)({ logger }));
}
app.get("/discovery", (req, res) => {
    database
        .query("SELECT * FROM squid.businesses")
        .then((results) => {
        res.json(results);
    })
        .catch((err) => {
        res.status(500).json({ error: "Error retrieving data from database" });
    });
});
const port = process.env.APP_PORT
    ? parseInt(process.env.APP_PORT)
    : 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
