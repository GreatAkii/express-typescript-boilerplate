"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log(process.env.APP_PORT);
console.log(typeof process.env.DB_PASSWORD);
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});
