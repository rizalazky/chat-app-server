const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const bodyParser = require('body-parser')


const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const {userRoutes} = require("./routes");


app.use(cors())
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/user',userRoutes)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})