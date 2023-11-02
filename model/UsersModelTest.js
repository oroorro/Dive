const connection  = require("../util/database");

module.exports = class UsersModelTest{



    
    getUserId(data){
    
        let stmt = `select user_id from user where userName = ?`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data.userName])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
        }))

    }

    getUserPassword(data){
        console.log("getting password for userName:", data);

        const statment = "SELECT password FROM user WHERE userName = ?"
        return (new Promise((resolve, reject) => {
            connection.execute(statment, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
        }))

        
    }

}