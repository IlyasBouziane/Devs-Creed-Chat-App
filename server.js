const path = require('path')
const express = require('express')
const http = require('http')
// We need to work with http module in order to use websockets
const socketio = require('socket.io')
const PORT = process.env.PORT || 3000


const formatMessage = require('./utils/formatMessage')
const DEVMASTER = 'The Master' 

const app = express()
const server = http.createServer(app)
const io  = socketio(server)
io.on('connection',socket => {

    //Welcome message
    socket.emit('message',formatMessage(DEVMASTER,'Welcome To the Brotherhood !'))

    //When a user enters the chat
    socket.broadcast.emit('message',formatMessage(DEVMASTER,'A dev has joined the chat'))

    //When a user leaves the chat
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(DEVMASTER,'A dev has left the chat'))
    })

    //Messages from the chat 
    socket.on('chatMessage',message => {
        io.emit('message',formatMessage('DEV',message))
    })
})

app.use(express.static(path.join(__dirname,'public')))

server.listen(PORT,() => console.log(`Server started running on port ${PORT}`)) 

