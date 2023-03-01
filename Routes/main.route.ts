//router of server side

import express from 'express';
const Main_router : express.IRouter = express.Router();
const controller = require('../Controller/login.controller');
import cors from 'cors'

Main_router.use(express.json());
Main_router.use(cors({
    "origin":'*',
    "methods": ['GET','POST','PUT','DELETE']
}))
Main_router.use(express.urlencoded({ extended: true }));

Main_router.get("/", (req : express.Request,res :express.Response)=>{
    res.send('Welcome to expressTS')
})
Main_router.post('/register',(req : express.Request,res :express.Response)=>{
    controller.register(req,res);
})
Main_router.post('/login',(req : express.Request,res :express.Response)=>{
    controller.login(req,res)
})
Main_router.get('/get/:id',(req : express.Request,res :express.Response)=>{
    controller.getUser(req,res)
})
module.exports = Main_router ;