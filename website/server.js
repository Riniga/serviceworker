const openbrowser = require('open');
const express = require('express');
const app = express()
const port = 4444

//const http = require('http');
//var server = http.createServer(app);
//var io = require('socket.io').listen(server);

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
  openbrowser(`http://localhost:${port}`)
})

// io.socket.on("connection", function(socket) 
// {
//   socket.on("message",function(message)
//   {
//     socket.emit("message", message);
//   }  );

// }
// );