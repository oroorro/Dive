const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 9888; 

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

app.get('/home', (req, res) => {
    res.sendFile(__dirname + "/src/main.html");
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + "/src/loginpage/loginMain.html");
})

app.post('/form_receiver', urlencodedParser, (req, res) => {
    //console.log(res);
    //res.send("POST worked");
    res.send(req.body.uname +": " + req.body.psw);
})
  

app.use(express.static('./src'));