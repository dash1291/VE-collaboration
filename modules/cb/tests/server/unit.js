var io = require('./socket.io-client/lib/socket.io-client.js');
var assert = require('assert');

//Builds an array of websocket clients
//address = address of the server , count = number of clients to build
//Returns the array of websocket clients
var serverAddr = 'http://localhost:8080';
    
var testBroadcast = function() {
  var timeout = 0;
  var transac = 'test';
  var options = {
    transports: ['websocket'],
    'force new connection': true
  };
  var client1 = io.connect(serverAddr, options);
  var client2 = io.connect(serverAddr, options);
  var client3 = io.connect(serverAddr, options);
  var callback = function(data) {
    assert.equal(data, transac, 'Transaction broadcasted does not match.');
  };
  client1.on('transaction', callback);
  client2.on('transaction', callback);
  client3.on('transaction', callback);
  client1.emit('transaction', transac);
  return;
}();
