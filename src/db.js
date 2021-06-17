// Librarys

const mysql = require("mysql");
const { promisify } = require("util");
const { env } = require("./lib/utils");


// Database Connection

let pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

pool.getConnection((err, conn) => {
  if (err) throw err;
  
  if (conn) {
    conn.query("CREATE TABLE IF NOT EXISTS items(ID INT(16) NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(16) NOT NULL, price INT(10) NOT NULL, ammount INT(10) NOT NULL)");
    
    conn.release();
    
    console.log(`connected to ${process.env.DB}`);
  }
});

pool.query = promisify(pool.query);

module.exports = pool;