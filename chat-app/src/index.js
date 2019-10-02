const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')

// socket.io must be passed raw http server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const documentRoot = path.join(__dirname, '../public')

app.use(express.static(documentRoot))

io.on('connection', (socket) => {
  console.log('new websocket connection')

  socket.emit('message', 'Welcome!') // unicast
  socket.broadcast.emit('message', 'new user has joined') // broadcast

  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter()
    if (filter.isProfane(message)) {
      return callback('profanity detected')
    }
    io.emit('message', message) // multicast (all users beside self)
    callback()
  })

  socket.on('sendLocation', (coords, callback) => {
    io.emit('message', `Location: https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', 'a user has left')
  })
})

server.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
