const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

// socket.io must be passed raw http server
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const documentRoot = path.join(__dirname, '../public')

app.use(express.static(documentRoot))

io.on('connection', (socket) => {
  console.log('new websocket connection')

  socket.emit('message', 'Welcome!')

  socket.on('sendMessage', (message) => {
    io.emit('message', message)
  })

  // socket.emit('countUpdated', count)

  // socket.on('increment', () => {
  //   count++
  //   // socket.emit('countUpdated', count) // one client
  //   io.emit('countUpdated', count) // all clients
  // })
})

server.listen(port, () => {
  console.log(`listening on port ${port}...`)
})
