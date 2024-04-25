import express, { Request, Response } from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'squid',
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/discovery', (req: Request, res: Response) => {
  connection.query('SELECT * FROM squid.businesses', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(results);
  });
});


const port: number = process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});