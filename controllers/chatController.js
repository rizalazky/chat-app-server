const connection = require('../config/database');

module.exports = {
    getDataChat : (req,res)=>{
        
    },
    getMessages : (req,res)=>{

    },
    sendMessage : (msg)=>{
        let text = msg.textMessage
        let from = msg.from
        let to = msg.to
        let queryCheckRoom = `SELECT * FROM tb_chat_room WHERE users = '${from}_${to}' OR users = '${to}_${from}'`;
        connection.query(queryCheckRoom,(err,rows)=>{
            if(err) throw err;

            if(rows.length == 0){
                let query = `INSERT INTO tb_chat_room (users) VALUES ('${from}_${to}')`;
                connection.query(query,(err,rows)=>{
                    if(err){
                        throw err;
                        return {
                            "status" : "NOT OKE",
                            "message" : "Error Internal Server",
                            "data" : err
                        }
                    }
                    console.log("ROWS",rows)
                })
            }
            console.log(rows[0])
            let roomId = rows[0].users;
            let queryInsertMessage = `INSERT INTO tb_messages (id_room,user,text) VALUES ('${roomId}','${from}','${text}')`
            connection.query(queryInsertMessage,(err,rows)=>{

                if(err){
                    throw err;
                    return {
                        "status" : "NOT OKE",
                        "message" : "Error Internal Server",
                        "data" : err
                    }
                }
                return {
                    "status" : "OKE",
                    "message" : "Berhasil Insert Message"
                }
            })
            
        })
        
    },
    findUserToChat : (req,res)=>{
        let username = req.params.username;
        let query = `SELECT * FROM tb_user WHERE username= '${username}'`;
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
    getListChatRoom : (req,res)=>{
        let username = req.params.username;
        console.log("USERNAME",username)
        let query = `SELECT * FROM tb_chat_room WHERE users LIKE '%${username}%'`;
        connection.query(query,(err,rows,fields)=>{
            if(err){
                throw err;
                res.json({
                    "status" : "NOT OKE",
                    "message" : "Error Internal Server",
                    "data" : err
                })
            };

            console.log("ROWS",rows)
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
    getDataMessage : (req,res)=>{
        let roomId = req.params.roomID
        let query = `SELECT * FROM tb_messages WHERE id_room = '${roomId}'`;
        connection.query(query,(err,rows,fields)=>{
            if(err){
                throw err;
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
    }
}