import mysql, { Pool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();
class DB {
  private pool: Pool;
  constructor() {
    dotenv.config();
    this.pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "squid",
      connectionLimit: 10,
      maxIdle: 10,
    });
  }

  public query(sql: string) {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, (err: Error | null, results: Object | null) => {
        if (err) {
          reject(new Error("Error retrieving data from database"));
        }
        resolve(results);
      });
    });
  }
}
export default DB;
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
