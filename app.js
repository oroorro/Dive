const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const fs = require('fs');


//const dotenv = require("dotenv");
//dotenv.config();



/*
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PSWORD,
  database: process.env.DB_DATABASE
});

db.connect((error)=>{
  if(error) throw error;
  console.log("connected to DataBase");
});
*/


const app = express();
const port = process.env.PORT || 8080; 



var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jasonParser  = bodyParser.json();


const data = fs.readFileSync("./config/database.json");
const dbConfig = JSON.parse(data);

var connection = mysql.createConnection({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    port: dbConfig.port,
    database: dbConfig.database,
});



connection.connect((error)=>{
  if(error) throw error;
  console.log("connected to DataBase");
});

const select = "select * from user"
connection.query(select, (err, result)=>{
    if(err) throw err;
    console.log(result);
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/src/main.html");
    console.log("home here");
})

app.post('/home/download',jasonParser, (req, res)=>{

    let t = decodeURIComponent(req.body.url)

    const sql = `INSERT INTO user (id, dataURL) VALUES(4, '${t}')`;
    connection.query(sql, (error, rows, fields) => {
      if (error) throw error;
    });
    
    connection.end();

    res.send(JSON.stringify("POST worked"));
    const { exec } = require('node:child_process');
 
    
    exec('echo "The \\$HOME variable is $HOME"', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      
    }); 
    
    exec('dir', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        
      }); 

      exec('cd ', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        
      }); 
    
   


    //get the URL and download it to DB 

    //then run unix command to convert the file 

    //and return the new file, res  
})

app.use('/home/download', function(req, res, next){
    console.log(req.body.url);
    next();
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/src/loginpage/loginMain.html");
})




app.post('/form_receiver', urlencodedParser, (req, res) => {
    console.log(req.body.uname +": " + req.body.psw);
    res.send(req.body.uname +": " + req.body.psw);
})
  

app.use(express.static('./src'));