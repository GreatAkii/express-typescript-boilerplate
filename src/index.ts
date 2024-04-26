import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db";
import pino from "pino";
import pinoHttp from "pino-http";

dotenv.config();
const app: Express = express();
const database = new db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(`> running in ${app.get("env")} mode`);
if (app.get("env") === "development") {
  const logger = pino();
  app.use(pinoHttp({ logger }));
}

app.get("/discovery", (req: Request, res: Response) => {
  database
    .query("SELECT * FROM squid.businesses")
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: "Error retrieving data from database" });
    });
});

const port: number = process.env.APP_PORT
  ? parseInt(process.env.APP_PORT)
  : 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
