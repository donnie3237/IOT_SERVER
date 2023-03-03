//This file to make Controller process

const { ObjectID , ObjectId} = require('bson');
const model = require('../model/main.model');
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
import express  from "express";
type Action =  express.Request;
type Reaction   =  express.Response;

exports.register =async (req:Action,res:Reaction) => {
    const User = model

    const hashPAss = await bcrypt.hash(req.body.password,10)

    console.log(hashPAss)

    User.find({"username": req.body.username}).then((result: any)=> 
        {
            const new_user = new User({
                name: req.body.name,
                username: req.body.username,
                password: hashPAss
            })
            if(!result){
                res.send("รหัสซ้ำ")
            }else if(result = []){
            try {
                const user = {
                    "name":req.body.name,
                    "username":req.body.username,
                    "password": hashPAss,
                    "img_URI": req.body.img
                }
                new_user.save(user)
                res.send("success")
                console.log(user)
                }
                catch (error) {
                    console.log(error)
                }
            }
        }
    )  
};  
exports.login = async (req:Action,res:Reaction)=>{
    const User = model
    const userName = req.body.username;
    
    User.find({"username": userName }).then((result:any)=> {
        if(result !== ""){
            const passwordsMatch =  bcrypt.compareSync(req.body.password , result[0].password )
            if (passwordsMatch) {
                let UserID = result[0]._id
                const user = {userID : UserID}
                const token : string = jwt.sign(user , process.env.TOKEN_SECRET)
                res.json({AccesToken: token})
            }else{
                console.log('password not true')
                res.send("wrongpass")
            }
        }else{
            console.log("user not found")
            res.send("notfound")
        }
    })
}

exports.getUser = (req: any,res:Reaction)=>{
    const User = model
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.decode(token);
    const ID = decoded.userID
    User.find({_id: ObjectID(ID)}).then((result:any)=> {
        res.json({ name: result[0].name,
                   username:result[0].username,
                   id : result[0]._id
                });
    }).catch((error:any)=>{
        console.error(error);
        res.sendStatus(500);
    });
} 