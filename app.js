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

app.post('/home/download', (req, res)=>{
    res.send("POST worked");
    //get the URL and download it to DB 

    //then run unix command to convert the file 

    //and return the new file, res  
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