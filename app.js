const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require('express-session');
//const dotenv = require("dotenv");
//dotenv.config();

const {formSubmit, getMonthData, loginHandler} = require('./controller/UsersController');

const redis = require('redis');
const e = require('express');
const RedisStore = require("connect-redis").default;



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
app.set("views", path.join(__dirname, './view'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './view')));


var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jasonParser  = bodyParser.json();

/*
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
*/
app.use(cookieParser());

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

let redisClient = redis.createClient();
redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log(`Fail to connect with redis. ${err}`));
redisClient.on('connect', () => console.log('Successful to connect with redis'));

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: 'blah blah',    //The way of secret needs to be invisible to pulbic
  resave: false,
  saveUninitialized: true,
}));


app.get('/', (req, res) => {
    //res.sendFile(__dirname + "/src/main.html");

    

    if (req.session.user) {
      //console.log(req)
      console.log("welcome !", req.session, req.session.user);
      res.render("main",{userName: req.session.user.userName});
    }
    else{
      res.render("main",{userName: null});
    }
    
    //console.log("home here", req.cookies, req.signedCookies);
    
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
 
    //testing shell command 
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
    //res.sendFile(__dirname + "/src/loginpage/loginMain.html");
    //get user's info from req 
    if(req.session.isAuth){
      console.log(req.session);
      console.log("isAuth check");
    }

  //user with session already exist then 
  if (req.session.user) {
    console.log("이미 로그인 돼있습니다~", req.session.isAuth);
    res.redirect("/");
  }else{
    res.render("loginPage",{errorMessage: null});
  }

})






app.post('/logout',jasonParser, (req, res) => {
  console.log("logging out");
  req.session.destroy((err) => {
    if (err) console.log(err);
  })
  res.clearCookie('connect.sid');
  res.send(JSON.stringify({success : true}));
})



app.post('/login', urlencodedParser, loginHandler);

/*
app.post('/login', urlencodedParser, (req, res) => {


    if(req.session.isAuth){
        console.log(req.session);
        console.log("isAuth check");
    }

    //user with session already exist then 
    if (req.session.user) {
      console.log("이미 로그인 돼있습니다~");
     
    }
    else{
      req.session.user = {
        userName: req.body.uname,
        pw: req.body.psw,
        authorized: true,
      };

    }
    res.redirect("/");

  //res.render("loginPage",{errorMessage: "failed"});
})
*/


app.post('/form_receiver', urlencodedParser, (req, res) => {
//app.post('/form_receiver', jasonParser, (req, res) => {
    console.log(req.body, req.body.userName +": " + req.body.passWord);
   

    //check if password matches with given id 

    //password did not match or id did not exist 
    //res.redirect("/login");
    //{message: 'hello'}
    //res.send(JSON.stringify("wrong password"));
    //res.send(JSON.stringify({message:"wrong password"}));

    res.render("loginPage",{errorMessage: "failed"});
    //password matched, redirect to /
    

})
  


app.get("/register",(req,res) => {
  res.render("register");
})

app.post("/register", urlencodedParser,formSubmit,(req,res)=>{
  res.redirect("/login");
})



app.get("/monthdata", jasonParser, getMonthData, (req,res)=>{



})