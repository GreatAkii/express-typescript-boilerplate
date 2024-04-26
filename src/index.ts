import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db";
import pino from "pino";
import pinoHttp from "pino-http";

dotenv.config();
const app: Express = express();
const database = new db();

// Enable JSON parsing middleware
app.use(express.json());

// Enable URL-encoded form data parsing middleware
app.use(express.urlencoded({ extended: true }));

// Log the current environment mode
console.log(`> running in ${app.get("env")} mode`);

// Enable logging middleware in development mode
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
      res.status(500).json("Error: " + err.message);
    });
});

// Set the port number for the server
const port: number = process.env.APP_PORT
  ? parseInt(process.env.APP_PORT)
  : 3000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening on port ${port}...`);
});
