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
// Enable JSON parsing middleware
app.use(express_1.default.json());
// Enable URL-encoded form data parsing middleware
app.use(express_1.default.urlencoded({ extended: true }));
// Log the current environment mode
console.log(`> running in ${app.get("env")} mode`);
// Enable logging middleware in development mode
if (app.get("env") === "development") {
    const logger = (0, pino_1.default)();
    app.use((0, pino_http_1.default)({ logger }));
}
app.get("/discovery", (req, res) => {
    database
        .query("SELECT * FROM squid.businesses")
        .then((results) => {
        results.forEach((result) => {
            console.log(result);
        });
        res.json(results);
    })
        .catch((err) => {
        res.status(500).json("Error: " + err.message);
    });
});
// Set the port number for the server
const port = process.env.APP_PORT
    ? parseInt(process.env.APP_PORT)
    : 3000;
// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});
