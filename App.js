const express = require("express");
var app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("viewengine", "ejs");
app.use(logger)
app.use('/public', express.static(__dirname + "/public"))

io.on('connection', (socket) => {
  console.log('a user connected');

  setInterval(function() {

    var date = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var day = days[date.getDay()];
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();
    var timezone = date.toString().match(/([A-Z]+[\+-][0-9]+.*)/)[1];
    var session = "AM";

    if (h == 0) {
        h = 12;
    }

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    var time = h + ":" + m + ":" + s + " " + session;
    var full_date = day + ', ' + dd + '/' + mm + '/' + yyyy;

    var time_string = time + "@" + full_date + "@" + timezone;

    socket.send(time_string)
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