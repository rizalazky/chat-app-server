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

const {userRoutes} = require("./routes");

app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user',userRoutes)

io.on('connection',(socket)=>{
  console.log("New Client Connected!"+socket.id);

  socket.emit('connection',null);
  socket.on('chat message',(msg)=>{
    console.log('Message ', msg)
    io.emit('chat message',msg)
  })
})



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})