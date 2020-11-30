const express = require('express')
const http = require('http')
const { ExpressPeerServer } = require('peer')



const app = express()
const server = http.createServer(app)
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/myapp'
})
let clients = {}

app.use(express.static('public'))
app.use('/peerjs', peerServer)

peerServer.on('connection', client => {
  clients[client.id] = client.id
  console.log('clients', clients)
})

server.listen(9000, () => console.log('server running on 9000'))