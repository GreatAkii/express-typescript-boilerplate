"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const connection = mysql2_1.default.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'squid',
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/discovery', (req, res) => {
    connection.query('SELECT * FROM squid.businesses', (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        res.json(results);
    });
});
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
