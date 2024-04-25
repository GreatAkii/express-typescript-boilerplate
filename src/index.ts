import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});