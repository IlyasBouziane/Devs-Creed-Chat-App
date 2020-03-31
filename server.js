const path = require('path')
const express = require('express')
const http = require('http')
// We need to work with http module in order to use websockets
const socketio = require('socket.io')
const PORT = process.env.PORT || 3000


const {devJoin,getDev,devLeave,getDevsRoom} = require('./utils/devs')
const formatMessage = require('./utils/formatMessage')
const DEVMASTER = 'The Master' 


const app = express()
const server = http.createServer(app)
const io  = socketio(server)
io.on('connection',socket => {

    //Join room
    socket.on('Join room',({devname,room}) => {
        
        // I considered socket id as dev id 
        const dev = devJoin(socket.id,devname,room)
        console.log(dev)
        // It's possible to hard code it using vanilla js, but I wanted to try the method 'join' provided by socket.io
        socket.join(dev.room)

        // Welcome message
        socket.emit('message',formatMessage(DEVMASTER,'Welcome To the Brotherhood !'))

        // Send infos about the room and its users
        io.to(dev.room).emit('roomDevs',{
            devs : getDevsRoom(room)  ,
            room 
        })

        // When a user enters the chat. 'to()' makes it possible to broadcast the message only for devs in the same room
        socket.broadcast
            .to(dev.room)
            .emit('message',formatMessage(DEVMASTER,`${dev.devname} has joined the chat`))
    })

    // Messages from the chat 
    socket.on('chatMessage',message => {
        const dev = getDev(socket.id)
        console.log(dev)
        io.to(dev.room).emit('message',formatMessage(dev.devname,message))
    })
    

    // When a user leaves the chat
    socket.on('disconnect', () => {
        const dev = devLeave(socket.id)
        if(dev){
            io.to(dev.room).emit('message', formatMessage(DEVMASTER, `${dev.devname} has left the chat`))
             // Send infos about the room and its users
             io.to(dev.room).emit('roomDevs',{
                devs : getDevsRoom(room)  ,
                room 
        })
        }   
    })

    
})

app.use(express.static(path.join(__dirname,'public')))

server.listen(PORT,() => console.log(`Server started running on port ${PORT}`)) 

