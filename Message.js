let mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    from_user:{
        type: String,
        required: [true,"Please enter user"]

    },
    room:{
        type: String,
        required: [true,"Please enter room"]
    },
    message:{
        type: String,
        required: [true,"Please enter message"]

    },
    date_send:{
        type: Date,
        default: Date.now

    }
})

const messager = mongoose.model("message",messageSchema)
module.exports = messager;