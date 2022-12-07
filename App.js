const express = require("express");
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("viewengine", "ejs");
app.use(logger)
app.use(express.static(__dirname + "/public"))

io.on('connection', (socket) => {
  console.log('a user connected');

  setInterval(function() {
    // var date = Date()
    socket.send(Date())
  }, 1000)

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })
});

function logger(req, res, next) {
  console.log(req.method + " - " + req.ip)
  next()
}

app.get("/", (req, res) => {
  res.render(__dirname + "/views/index.ejs");
});


server.listen(3000, () => {
  console.log('Listening on PORT:3000');
});