const express = require('express')
const fs = require('fs')
const http = require('http')
const { ExpressPeerServer } = require('peer')


const app = express()
const server = http.createServer(app)
const ssl = {
  key: fs.readFileSync('key/server.key'),
  cert: fs.readFileSync('key/server.crt')
}
const peerServer = ExpressPeerServer(server, {
  debug: true,
  ssl,
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