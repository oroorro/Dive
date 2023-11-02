
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');



const data = fs.readFileSync(path.join(__dirname, "../config/database.json"));
const dbConfig = JSON.parse(data);

console.log(dbConfig);

const connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    database: dbConfig.database,
});

/*
connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log("Mysql Connected");
    }
  });
*/

module.exports = connection.promise();