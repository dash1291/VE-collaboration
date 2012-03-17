/*Collaboration server for Visual Editor.
Much based on the Google Wave's implementation of operational transformation.
*/

//Load the VE modules(models) here --->
/*
$ = require('jquery');

window = {}; // globals flurry to make the VE 'require's work
window.JSON = JSON;
ve = {};
ve.dm = {}; 

// files included here:
require('../ve/ve.js');
require('../ve/ve.Position.js');
require('../ve/ve.Range.js');
require('../ve/ve.EventEmitter.js');
require('../ve/ve.Node.js');
require('../ve/ve.BranchNode.js');
require('../ve/ve.LeafNode.js');
require('../ve/dm/serializers/ve.dm.AnnotationSerializer.js');
require('../ve/dm/serializers/ve.dm.HtmlSerializer.js');
require('../ve/dm/serializers/ve.dm.JsonSerializer.js');
require('../ve/dm/serializers/ve.dm.WikitextSerializer.js');
require('../ve/dm/ve.dm.js');
require('../ve/dm/ve.dm.Node.js');
require('../ve/dm/ve.dm.BranchNode.js');
require('../ve/dm/ve.dm.LeafNode.js');
require('../ve/dm/ve.dm.TransactionProcessor.js');
require('../ve/dm/ve.dm.Transaction.js');
require('../ve/dm/ve.dm.Surface.js');
require('../ve/dm/nodes/ve.dm.DocumentNode.js');
require('../ve/dm/nodes/ve.dm.HeadingNode.js');
require('../ve/dm/nodes/ve.dm.ParagraphNode.js');
require('../ve/dm/nodes/ve.dm.PreNode.js');
require('../ve/dm/nodes/ve.dm.ListItemNode.js');
require('../ve/dm/nodes/ve.dm.ListNode.js');
require('../ve/dm/nodes/ve.dm.TableCellNode.js');
require('../ve/dm/nodes/ve.dm.TableNode.js');
require('../ve/dm/nodes/ve.dm.TableRowNode.js');
*/
var clientSpaces, serverSpace, transacHistory, currentParent, users;

var init = function() {

}();
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
  var parentHash = clientTransac['parentHash'];
  for( i = transactionHistory.length-1; i >= 0; i-- ) {
    if( parentHash > transacHistory[i]['parent'] ) {
      var serverTransac = transacHistory[i];
    }
    if( parentHash < transacHistory[i] ) {
        
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
