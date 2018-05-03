var express = require('express');
var socket = require('socket.io');
var bodyParser = require('body-parser');

var app = express();
var server = app.listen(3000 ,function(){
  console.log('Server listening at port 3000');
});

app.set('view engine' , 'ejs');
app.use(express.static('views'));

var i = 0;
/*app.get('/' , function(req , res){
  res.sendFile('/Users/ujjwalprakash/websockets/public/open.html');
});
app.post('/' , parser , function(req,res){
  console.log(req.body);
  res.render('index',{details: req.body});
});*/

var io = socket(server);
io.on('connection' , function(socket){
  console.log('Socket connection made',socket.id);
  i++;
  console.log('Number of connected users is: ' + i);
  socket.on('disconnect' , function(){
    console.log('User disconnected with socket id ' , socket.id);
  i-- ;
  });

  socket.on('join' , function(data){
    socket.broadcast.emit('join' , data);
  })


  socket.on('chatting' , function(data){
    io.sockets.emit('chatting',data);
  });

  socket.on('logout' , function(data){
    io.sockets.emit('logout',data);
  });


  socket.on('typing',function(data){
    socket.broadcast.emit('typing',data);
  });


});
