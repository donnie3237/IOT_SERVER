require('dotenv').config();
require('./DB/db')
const express = require('express') 
const app = express();
const PORT:string | number | undefined = process.env.PORT;
import cors from 'cors'
const Main_router = require('./Routes/main.route');

// use Router
app.use("/",Main_router)

// middle ware
app.use(express.json())
app.use(cors({
    "origin":'*',
    "methods": ['GET','POST','PUT','DELETE']
}));
app.use(express.urlencoded({ extended : true}))

//listan port
app.listen(PORT,()=>{
    console.log(`listining on port ${PORT}`)
})