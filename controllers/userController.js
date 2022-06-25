const connection = require('../config/database');

const userController ={
    getDataUser : async (req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        let query = `SELECT * FROM tb_user WHERE username= '${username}' AND password = '${password}'`;
        connection.query(query,(err,rows,fields)=>{
            if(err){
                res.json({
                    "status" : "NOT OKE",
                    "message" : "Error Internal Server",
                    "data" : err
                })
            };
            if(rows.length > 0){
                res.json({
                    "status" : "OKE",
                    "message" : "Data ditemukan",
                    "data" : rows
                })
            }else{
                res.json({
                    "status" : "NOT OKE",
                    "message" : "Data tidak ditemukan",
                    "data" : rows
                })
            }
        })
    },
    register : (req,res)=>{
        let response = {
            "status" : "OKE",
            "message" : "Berhasil Registrasi"
        }
        let data = {
            username : req.body.username,
            password : req.body.password,
            name : req.body.name,
            image : req.body.image,
        }
        
        let query = `INSERT INTO tb_user (username,password,name,image) VALUES ('${data.username}','${data.password}','${data.name}','${data.image}')`;
        connection.query(query,(err,rows,fields)=>{
            if(err){
                response.status = "NOT OKE"
                response.message = "Gagal Registrasi"

                res.json(response)
            };
            res.json(response)
        })
       
    }
}


module.exports = userController