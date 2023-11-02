
const {getUserId, getHighestLevel, registerSubmit, getUserPassword} = require("../model/UsersModel");
const UsersModelTest = require('../model/UsersModelTest');

const test = new UsersModelTest();

exports.formSubmit = async (req, res, next) => {
    /*
    let temp;
    try {
        data = await registerSubmit(req.body,temp)
       //  res.locals.message = req.flash();
       // res.json({ msg: "success", data: data });
       .then((response) => console.log(response))

        console.log(JSON.stringify(data));
        
    } catch (error) {
        console.log(error);
    }
    */

    
    //getting user_id
    try{
        
        const user_id = await test.getUserId();
        console.log("user_id : ", user_id);
    }
    catch(error){
        console.log(error);
    }



    /*
    try{
        user_id = await getUserId(1)
        .then((response) => console.log(response))
        console.log(JSON.stringify(user_id), req.res);
    }
    catch(error){
        console.log(error);
    }
    */

    next();
}

exports.getMonthData = async (req, res, next) => {

    //cookie's session has userId
    //req.session.user.userName
    //req.body.month has month name 
    
    //getting user_id
    let user_id;
    try{
        user_id = await getUserId(req.session.user.userName)
    }
    catch(error){
        console.log(error);
    }

    console.log(user_id);
    const option = {user_id: user_id, year: req.body.year, month: req.body.month, date: req.body.date};

    //getting given user_id's highest level and it's startTime and endTime 
    try {
        data = await getHighestLevel(option);
       //  res.locals.message = req.flash();
    // res.json({ msg: "success", data: data });
    } catch (error) {
        console.log(error);
    }
    console.log(data);
    next();
}


exports.loginHandler = async (req, res) => {

    //req.body.

    //user with session already exist then redirect to /
    if (req.session.user) {
        console.log("redirecting here...")
        res.redirect("/");
    }
    else{
        //check if given id's password matches with database's password
        

        //get password by using getUserPassword model 
        let passwordFromDB;
        try {
            [passwordFromDB] = await test.getUserPassword(req.body.uname);
        }
        catch (error) {
            console.log(error);
        }
        console.log("password retrieved :" ,passwordFromDB);

        //compare password
        if(passwordFromDB.password === req.body.psw){
            //if password matches, set session and redirect to /
            req.session.user = {
                userName: req.body.uname,
                pw: req.body.psw,
                authorized: true,
            };
            //since this controller was called from fetch, let the fetch; front end changes url  > wrong, it was called from <form>
            //res.send(JSON.stringify({success : true}));
            res.redirect('/');
        }
        //if password did not match, render error message to /login page 
        else{
            res.render("loginPage",{errorMessage: "wrong password"});
        }
    }

};