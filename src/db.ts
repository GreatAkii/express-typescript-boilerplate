import mysql, { Pool, RowDataPacket } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

//Represents a business entity.
export interface Business extends RowDataPacket {
  id: number;
  longitude: number;
  latitude: number;
  type: string;
}

//Represents a database connection.
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

  //Executes a SQL query and returns the results of type Business[].
  public query(sql: string) {
    return new Promise<Business[]>((resolve, reject) => {
      this.pool.query<Business[]>(sql, (err, results) => {
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
