/*Collaboration server for Visual Editor.
Much based on the Google Wave's implementation of operational transformation.
*/

var clientSpaces, serverSpace, transacHistory;
function xform(a, b) {
  //TODO::xform function
}

function transform(clientTransac) {
  /*TODO::transform function???
  1- Look at the parent hash of clientTransac
  2- Lookup transacHistory for parent hash of clientTransac
  3- a = clientTransac; b = transacHistory[parenthash = clientTransac.parenthash]
  4- client', server' = xform(a, b)
  5- applyTransac(serverSpace, client')
  */
}
var io = require('socket.io').listen(8080);
io.sockets.on('connection', function(socket) {
  //maybe do something on new client?

  socket.on('transaction', function(transaction) {
    console.log(transaction);
    //do something with the arrived transaction
    //xformedTransac = transform(transaction);
    //socket.emit('transaction', xformed_transac); // this is how it acknowledges the client
    //socket.broadcast.emit('transaction',xformed_transac);
  });
});
