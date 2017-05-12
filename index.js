var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var onlineUsers = new Array();
io.on('connection', function(socket){

  socket.on('people online', function(user){
    console.log('Connected now: ' + user);
    onlineUsers.push({"name":user, "since":Date.now(), "socket":socket.id});
    io.emit('online now', onlineUsers);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');

    onlineUsers = onlineUsers.filter(function(el) {
        return el.socket !== socket.id;
    });
    io.emit('online now', onlineUsers);
  });

});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
