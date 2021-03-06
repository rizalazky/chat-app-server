const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000
const bodyParser = require('body-parser')


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000"
  }
});

const {userRoutes,chatRoutes } = require("./routes");
const { chatController } = require('./controllers')

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

io.on('connection',(socket)=>{
  console.log("New Client Connected!"+socket.id);

  socket.emit('connection',null);
  socket.on('chat message',(msg)=>{
    let send = chatController.sendMessage(msg)
    console.log(send)
    io.emit('chat message',msg)
  })
})



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})