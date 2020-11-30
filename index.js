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

const PORT = process.env.PORT || 9000

server.listen(PORT, () => console.log(`server running on ${PORT}`))