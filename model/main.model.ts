//make schema model

import mongoose from "mongoose";
const model = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        password:{
            type: String,
            required: true
        },
        img_URI:{
            type: String
        }
    }, 
    {   
        collection: 'users',
    }
)

module.exports = mongoose.model("model", model);