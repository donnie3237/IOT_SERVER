//This file to make Controller process

const { ObjectID , ObjectId} = require('bson');
const model = require('../model/main.model');
const bcrypt =  require('bcrypt')

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
            if(result != ""){
                res.send("รหัสซ้ำ")
                console.log(":hh")
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
                console.log('Successfully logged in');
                res.send(UserID)
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

exports.getUser = (req:Action,res:Reaction)=>{
    model.find({_id :ObjectId(req.params['id'])}).then((result:any)=>{
        res.send(result)
    })
}

// app.post('/register',async (req,res)=>{
//     const hashPAss = await bcrypt.hash(req.body.password,10)
//     Database.collection('users').find({"username": req.body.username}).toArray((err,result)=>{
//         console.log(result)
        // if(result != ""){
        //     res.send("รหัสซ้ำ")
        //     console.log(":hh")
        // }else if(result = []){
        // try {
        //     const user = {
        //         "name":req.body.name,
        //         "username":req.body.username,
        //         "password": hashPAss,
        //         "img_URI": req.body.img
        //     }
        //     Database.collection('users').insertOne(user)
        //     res.send("success")
        //         }
        //      catch (error) {
        //         console.log(error)
        //     }
        // }
//     });
// })
// app.get('/get/:id',(req,res)=>{
//     Database.collection('users').find({_id :ObjectId(req.params['id'])}).toArray((err,result)=>{
//         res.send(result)
//     })
// })
// app.post('/login',async(req, res)=> {
    // const userName = req.body.username;
    // Database.collection('users').find({"username": userName }).toArray((err, result)=> {
    //     if(result != ""){
    //         const passwordsMatch =  bcrypt.compareSync(req.body.password , result[0].password )
    //         if (passwordsMatch) {
    //             let UserID = result[0]._id
    //             console.log('Successfully logged in');
    //             res.send(UserID)
    //         }else{
    //             console.log('password not true')
    //             res.send("wrongpass")
    //         }
    //     }else{
    //         console.log("user not found")
    //         res.send("notfound")
    //     }
    // })
// })
  
  
  
  