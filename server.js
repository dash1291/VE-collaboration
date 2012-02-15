/*Collaboration server for Visual Editor.
Much based on the Google Wave's implementation of operational transformation.
*/

var clientSpaces, serverSpace, transacHistory;
function xform(client, server) {
  //TODO::xform function
}

function transform(clientTransac) {
  parentHash = clientTransac['parent'];
  for( i = 0; !transacHistory[i]; i++ ) {
    if( parentHash == transacHistory[i]['parent'] ) {
      serverTransac = transacHistory[i];
      break;
    }
  }
  var pair = xform(clientTransac, serverTransac);
  transClient = pair.client;
  transServer = pair.server;
  /*TODO::transform function??
  5- applyTransac(serverSpace, transClient)
  */
  return transClient;
}
var io = require('socket.io').listen(8080);
io.sockets.on('connection', function(socket) {
  //maybe do something on new client?

  socket.on('transaction', function(transaction) {
    console.log(transaction);
    //do something with the arrived transaction
    xformedTransac = transform(transaction);
    socket.emit('transaction', xformed_transac); // this is how it acknowledges the client
    socket.broadcast.emit('transaction',xformed_transac);
  });
});
