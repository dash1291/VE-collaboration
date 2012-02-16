var io = require('socket.io');
var assert = require('assert');

//Builds an array of websocket clients
//address = address of the server , count = number of clients to build
//Returns the array of websocket clients
var serverAddr = 'http://localhost:8080';
function buildClients(address, count) {
  var clients = [];
  for( i = 0; i < count; i++ ) {
    client = io.connect(address);
    clients.push(client);
  }
  return clients;
}
    
var testBroadcast = function() {
  var timeout = 0;
  var transac = 'test';
  var clients = buildClients(serverAddr, 5);
  for( var client in clients ) {
    client.on('transaction', function(data) {
      assert.equal(data, transac, 'Transaction broadcasted does not match.');
    });
  }
  clients[0].emit('transaction', transac);      
}();
