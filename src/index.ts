import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.APP_PORT);
console.log(typeof process.env.DB_PASSWORD);
const app = express();

app.use(express.json());


const port: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});