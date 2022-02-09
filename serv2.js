const app = require('express')()
const http = require('http').createServer(app)

const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('Connection working for real')

    //socket.emit('welcome','testing: '+ socket.id)
   
    socket.on('message',(data)=>{

        console.log(data + 'hello')      
        //io.to(roomName).emit('newMessage', data)
    })
    socket.on('disconnect',() => {    
        console.log(`${socket.id} disconnected`)
    })
})