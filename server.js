/*Collaboration server for Visual Editor.
Much based on the Google Wave's implementation of operational transformation.
*/

var clientSpaces, serverSpace, transacHistory, currentParent, users;
function xform(client, server) {
  //TODO::xform function
  //xform different type transactions accordingly
  pos1 = server['operations'][0]['length'];
  pos2 = client['operations'][0]['length'];
  serverType = server['operations'][1]['type'];
  count = server['lengthDifference'];
  if( serverType == 'insert' ) {
    if (pos2 >= pos1) {
      pos2 = pos2 + count;
    }
  }
  else if( serverType == 'remove' ) {
    if( post2 >= pos1 ) {
      pos2 = pos2 + count;
    }
  }
  var transformed = client;
  transformed['operations'][0]['length'] = pos2;
  return transformed;
}

function transform(clientTransac) {
  var parentHash = clientTransac['parent'];
  for( i = 0; !transacHistory[i]; i++ ) {
    if( parentHash == transacHistory[i]['parent'] ) {
      var serverTransac = transacHistory[i];
      break;
    }
  }
  var pair = xform(clientTransac, serverTransac);
  var transClient = pair.client;
  var transServer = pair.server;
  /*TODO::transform function??
  5- applyTransac(serverSpace, transClient)
  */
  return transClient;
}

function pushUser(user, socket) {
  users.push(user);
 // socket.emit('user', user); //server acknowledgement for init?
  socket.broadcast.emit('user', user);
}

function pushTransac(transac, socket) {
  //var xformedTransac = transform(transac);
  //socket.emit('transaction', transac); // this is how it acknowledges the client
  socket.broadcast.emit('transaction', transac);
}

var io = require('socket.io').listen(8080);
io.sockets.on('connection', function(socket) {
  //maybe do something on new client?

  socket.on('user', function(user) {
    console.log('new user: ' + user);
    newUser(user, socket);
  });

  socket.on('transaction', function(transaction) {
    console.log('new transaction: ' + JSON.stringify(transaction));
    //do something with the arrived transaction
    pushTransac(transaction, socket);
  });

});
