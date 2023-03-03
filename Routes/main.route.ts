//router of server side

import express from 'express';
const Main_router : express.IRouter = express.Router();
const controller = require('../Controller/login.controller');
import cors from 'cors'
const jwt = require('jsonwebtoken')

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
const verifyToken = (req :any, res:any, next:any) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.TOKEN_SECRET, (err : any, decoded :any) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = decoded;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
Main_router.get('/get',(req : express.Request,res :express.Response)=>{
    controller.getUser(req,res)
    // controller.authToken(req,res)
})
module.exports = Main_router ;