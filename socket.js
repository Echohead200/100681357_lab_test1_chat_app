const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
//const { disconnect } = require('process')
//const { message } = require('statuses')
const PORT = 3005

//create server socket
const io = require('socket.io')(http)

app.get("/", (req,res)=>{
    res.send("Chat Server running...")
})

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


http.listen(PORT,()=>{
    console.log(`Server started ${PORT}`)

})