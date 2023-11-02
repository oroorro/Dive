const connection  = require("../util/database");
const { promisify } = require("util");

const promise_connection = promisify(connection.query).bind(connection);


//option will have userName 
//assume user has been logged in 
exports.getUserId = async (option,temp) => {


    let query = `select user_id from user where userName = ${option}`;
    
   
    return await connection.promise().excute(query);
    
     /*
    return new Promise((resolve, reject)=>{
        connection.query(query,  (error, results)=>{
            req.res = results;
            if(error){
                return reject(error);
            }
            return resolve(results);
        });
    });

    */
};


exports.getHighestLevel = async (option) => {

    let query = `select dur.level, dur.startTime, dur.endTime 
    from user as us
    join batch as bt
    on us.user_id = bt.user_id and us.user_id = ${option.user_id} and bt.date like "${option.year}-${option.month}-${option.date}%"
    join durationTable as dur 
    on dur.batch_id = bt.batch_id
    order by dur.level desc limit 1`;

    //let query = "select "+ str +" from users";
    return await promise_connection(query);
};

exports.registerSubmit = async (data) => {
    console.log("registering..", data);
    let stm = "insert into user(userName,password,email) values(?,?,?)";

    return new Promise((resolve, reject) => {
        connection.query(stm,[data.uname,data.psw,data.email], (err, result, field) => {
            
        });
    })



    //return await promise_connection(query,[data.uname,data.psw,data.email]);
};


exports.getUserPassword = async(data) => {
    console.log("getting password for userName:", data);
    let query = `select password from user where userName = "${data}"`;
    return await promise_connection(query);
}