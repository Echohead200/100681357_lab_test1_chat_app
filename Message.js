let mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    from_user:{
        type: String,
        required: [true,"Please enter password"]

    },
    room:{
        type: String,
        required: [true,"Please enter password"]
    },
    message:{
        type: String,
        required: [true,"Please enter password"]

    },
    date_send:{
        type: Date,
        default: Date.now

    }
})

const messager = mongoose.model("message",messageSchema)
module.exports = messager;