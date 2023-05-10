const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

console.log("Service working now");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DBUSERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("db " + connection.state);
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM names";
        connection.query(query, (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result);
        });
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }



  async  insertNewName(name){
    try {
        const dateAdded = new Date();
        const insertId = await new Promise((resolve, reject) => {
          const query = "INSERT INTO names (name, date_added) VALUES (?,?);";
          connection.query(query,[name,dateAdded], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result.insertId);
          });
        });
        console.log(insertId);
       // return insertId;
      } catch (error) {
        console.error(error.message);
        
    }

  } 
}

module.exports = DbService;
