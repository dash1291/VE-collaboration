//Script to establish websocket connection with the nodeJS collaboration server
//Requires socket.io.js

var user = 'Ashish';
var socket = io.connect('http://localhost:8080');
var bufferQueue;

function addUser(user) {
  //TODO::add user to the users list
}

function applyTransac(transac) {
  //TODO::apply transaction to the linear model
}
socket.on('connection', function() {
  socket.emit('user', user);
});

socket.on('user', function(user) {
  console.log('new user: ' + user);
  //addUser(user);
});

socket.on('transaction', function(transac) {
  console.log('transaction: ' + transac);
  //applyTransac(transac);
});


var onTransaction = function(transac) {
  //TODO::attach parentHash and localID to the transac
  socket.emit('transaction', transac);
};
