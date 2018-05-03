var socket = io.connect('http://localhost:4000');

var message = document.getElementById('message');
var myname = document.getElementById('myname');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var popup = document.getElementById('popup');


btn.addEventListener('click' , function(){
  socket.emit('chatting' , {
    message: message.value,
    name: myname.value,
  });
});
message.addEventListener('input',function(){
  socket.emit('typing',myname.value);
});

online.addEventListener('load' , function(){
  socket.emit('join' , myname.value);
});


socket.on('chatting',function(data){
  popup.innerHTML = "";
  output.innerHTML +='<p><strong>'+data.name+' :</strong>'+ ' '+data.message+'</p>';
});

socket.on('typing',function(data){
  popup.innerHTML = '<p><i>'+data+' is typing a message'+'</i></p>';
});
