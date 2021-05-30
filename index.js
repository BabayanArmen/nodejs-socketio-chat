const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
    cors: { origin: "*"}
})
const path = require('path')
const cors = require('cors')
const port = process.env.port || 3001

app.use(cors());
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
// // cors //
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With')
//     next()
//   })
// /////////
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, PUT, OPTION"
      )
    next()
  })

app.set('view engine', 'ejs')

let nickname = ''

app.get('', (req, res) => {
    res.render('home')
})
app.post('/setNickName', (req, res) => {
    nickname = req.body.nickname
    res.status(200).json({message: 'it works'})
})
app.get('/chat', (req, res) => {
    res.render('chat', {name: nickname})
})

io.on('connection', (socket) => {
    socket.on('message', (message) => {
        io.emit('message', message)
    })
})

server.listen(port, () => {
    console.log(`server running on port ${port}`);
})


