

const userController ={
    getDataUser : (req,res)=>{
        let username = req.body.username;
        let password = req.body.password;
        console.log(req.body)
        res.json({
            "status" : "OKE",
            "data" : req.body
        })
    }
}


module.exports = userController