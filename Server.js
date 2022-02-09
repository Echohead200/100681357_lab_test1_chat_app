const express = require('express')
const app = express()

const http = require('http').createServer(app)
const cors = require('cors')
const PORT = 3005
let mongoose = require("mongoose")
const userModel = require('./user')
//const { json } = require('body-parser')

const io = require('socket.io')(http)
app.use(express.json())
//app.use(cors())
 
io.on('connection',(socket)=>{
    console.log('Connection working for real')

    socket.emit('welcome','testing: '+ socket.id)
   
    socket.on('message',(data)=>{

        console.log(data + 'hello')      
        //io.to(roomName).emit('newMessage', data)
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
    //console.log("does this do anything?")
    res.sendFile(__dirname + "/login.html")
})


app.get('/user', async (req, res) => {
    const user = await userModel.find({});
    try {
      //console.log(user[3].userName)
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
      console.log(response)

      try{
          for(i=0;i<users.length;i++){
              if(response.inputName == users[i].userName && response.passcode == users[i].password){
                  console.log("Success! it works!")
                  res.sendFile(__dirname + "/Chatroom.html")
                  //res.end(JSON.stringify(users[i].userName+ " " + users[i].password));
              }else{
                  //console.log("failed " + i)
                  //res.end(JSON.stringify(response));
                }
          }
      } catch(err){
        res.status(500).send(err);
      }
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




var server = app.listen(PORT,()=>{
    var host = server.address().address
    console.log(`Server started at ${PORT}`, host)
})
// const Port2 = 8081
// http.listen(Port2, () => {
//     console.log(`Server started at ${Port2}`)
// })