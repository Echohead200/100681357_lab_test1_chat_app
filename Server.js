const express = require('express')
const app = express()


const http = require('http').createServer(app)
const cors = require('cors')
const PORT = 3000
let mongoose = require("mongoose")
const userModel = require('./user')
const messageModel =require('./Message')
//const { json } = require('body-parser')

const io = require('socket.io')(http)
app.use(express.json())
app.use(cors())

var roomName = 'test'

io.on('connection',(socket)=>{
    console.log('Connection working for real')

    socket.emit('welcome','testing: ')
    
    socket.on("joinroom", (room)=>{
        console.log("room was joined " + room)
        socket.join(room)
        roomName= room
        console.log(roomName + " server log ")
    })
   
    socket.on('message',(data)=>{

        console.log(data + ' ==> inbound')
   
        io.to(roomName).emit('newMessage', data)
    })
    socket.on('disconnect',() => {    
        console.log(`${socket.id} disconnected`)
    })
})


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
app.get("/signup.html",(req,res)=>{

    res.sendFile(__dirname + "/signup.html")
})


app.get('/user', async (req, res) => {
    console.log("tester /user")
    const user = await userModel.find({});
    try {
      res.status(200).send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.get('/gateway' , async(req,res)=>{
      let response = {
          inputName: req.query.inputName,
          passcode: req.query.passcode
      }

      const users = await userModel.find({})

      try{
          for(i=0;i<users.length;i++){
              if(response.inputName == users[i].userName && response.passcode == users[i].password){

                  res.sendFile(__dirname + "/Chatroom.html")
              }else{
                  //console.log("failed " + i)
                }
          }
      } catch(err){
        res.status(500).send(err);
      }
  })


//Add to database
app.post('/user', async (req,res) =>{
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

app.get('/messageposter', async (req, res) => {
    console.log("tester /message_poster")
    const talk = await messageModel.find({});
    try {
      res.status(200).send(talk);
    } catch (err) {
      res.status(500).send(err);
    }
  });

app.post('/messageposter',async(req,res)=>{
    console.log("message post is working")
    console.log(req.body)
    const talk = new messageModel(req.body)
    try{
        await talk.save((err)=>{
            if(err){
                res.send(err)
            }else{
             res.send(talk)   
            }
        })
    }catch(err){
        res.status(500).send(err)
    }
});



var server = http.listen(PORT,()=>{
    var host = server.address().address
    console.log(`Server started at ${PORT}`, host)
    
})
