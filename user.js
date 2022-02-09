//const { Module } = require("module")
let mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    // id:{
    //     type: Number,
    //     required: [true,"Please enter ID number"]
    // },
    userName:{
        type: String,
        required: [true,"Please enter username"]

    },
    firstName:{
        type: String,
        required: [true,"Please enter firstName"]
    },
    lastName:{
        type: String,
        required: [true,"Please enter lastName"]
    },
    password:{
        type:String,
        required: [true,"Please enter password"]
    },
    Created:{
        type: Date,
        default: Date.now
    }

})


const user = mongoose.model("user",userSchema)
module.exports = user;