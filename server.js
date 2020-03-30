const path = require('path')
const express = require('express')
const http = require('http')
// We need to work with http module in order to use websockets
const socketio = require('socket.io')
const PORT = 3000 || process.env.PORT

const app = express()
const server = http.createServer(app)
const io  = socketio(server)
io.on('connection',socket => console.log('A new WS connection detected'))

app.use(express.static(path.join(__dirname,'public')))

server.listen(PORT,() => console.log(`Server started running on port ${PORT}`)) 

