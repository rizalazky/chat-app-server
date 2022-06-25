const connection = require('../config/database.js');


const userModel = {
    addUser : (data)=>{
        connection.connect();
        let query = `INSERT INTO tb_user (username,password,name,image) VALUES ('${data.username}','${data.password}','${data.name}','${data.image}')`;
        connection.query(query,(err,rows,fields)=>{
            if(err) return false;
            return rows;
        })
        connection.end()
    },
    login : async (username,password)=>{
        let query = `SELECT * FROM tb_user WHERE username= '${username}' AND password = '${password}'`;
        connection.connect();
        const exec=connection.query(query,(err,rows,fields)=>{
            if(err) throw err;

            console.log(rows.length)
            return rows.length;
        })
        connection.end();
        console.log(exec)
        
    }
}

module.exports = userModel