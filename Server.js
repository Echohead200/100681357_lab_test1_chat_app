const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = 3000
let mongoose = require("mongoose")
const userModel = require('./user')

const io = require('socket.io')(http)


mongoose.connect("mongodb+srv://dbJeff:Midnight@cluster0.bnp1v.mongodb.net/2022Labtest1?retryWrites=true&w=majority",
{
    usenewUrlparser:true,
    useUnifiedTopology:true
    
}).then(success => {
    console.log(`MongoDB is Connected! ${success}` )
}).catch(err =>{
    console.log(`Mongodb Error: ${err}`)
})
app.get("/login.html",(req,res)=>{
    res.sendFile(__dirname + "/login.html")
})

//Add to database
app.post('/user',async (req,res) =>{
    console.log("post is working")
    console.log(req.body)
    const user = new userModel(req.body)

    try{
        await user.save((err)=>{
            if(err){
                res.send(err)
            }else{
             res.send(user)   
            }
        })
    }catch(err){
        res.status(500).send(err)
    }
})



http.listen(PORT, () => {
    console.log(`Server started at ${PORT}`)
})