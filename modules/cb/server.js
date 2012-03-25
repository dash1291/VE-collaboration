/*Collaboration server for Visual Editor.
Much based on the Google Wave's implementation of operational transformation.
*/

//Load the VE modules(models) here --->
$ = require('jquery');

window = {}; // globals flurry to make the VE 'require's work
window.JSON = JSON;
ve = {};
ve.dm = {}; 
es = {};
// files included here:
require('../es/es.js')
require('../es/es.Html.js')
require('../es/es.Position.js')
require('../es/es.Range.js')
require('../es/es.TransactionProcessor.js')
require('../es/bases/es.EventEmitter.js')
require('../es/bases/es.DocumentNode.js')
require('../es/bases/es.DocumentBranchNode.js')
require('../es/bases/es.DocumentLeafNode.js')
require('../es/bases/es.DocumentModelNode.js')
require('../es/bases/es.DocumentModelBranchNode.js')
require('../es/bases/es.DocumentModelLeafNode.js')
require('../es/bases/es.DocumentViewNode.js')
require('../es/bases/es.DocumentViewBranchNode.js')
require('../es/bases/es.DocumentViewLeafNode.js')
require('../es/bases/es.Inspector.js')
require('../es/bases/es.Tool.js')
require('../es/models/es.DocumentModel.js')
require('../es/models/es.HeadingModel.js')
require('../es/models/es.ListItemModel.js')
require('../es/models/es.ListModel.js')
require('../es/models/es.ParagraphModel.js')
require('../es/models/es.PreModel.js')
require('../es/models/es.SurfaceModel.js')
require('../es/models/es.TableCellModel.js')
require('../es/models/es.TableModel.js')
require('../es/models/es.TableRowModel.js')
require('../es/models/es.TransactionModel.js')
require('../es/serializers/es.AnnotationSerializer.js')
require('../es/serializers/es.HtmlSerializer.js')
require('../es/serializers/es.JsonSerializer.js')
require('../es/serializers/es.WikitextSerializer.js')
doc = { 'type': 'document', 'children': [ {
          'type': 'paragraph', 'content': { 
            'text': ''
          }
        } ]
}

var clientSpaces, serverSpace, transacHistory, currentParent, editor = null, users = [];

var init = function() {
  window.documentModel = es.DocumentModel.newFromPlainObject( doc );
  window.surfaceModel = new es.SurfaceModel( window.documentModel );
  window.surfaceModel.select( new es.Range( 1, 1 ) );


}();

function emitDocument( socket ) {
  server_doc = JSON.stringify(window.documentModel.data);
  data = { 'doc': server_doc };
  if( editor ) {
    data['editor'] = editor;
  }
  data['users'] = JSON.stringify( users );
  socket.emit( 'init', data );
}

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
  socket.emit('user', user); //server acknowledgement for init?
  socket.broadcast.emit('user', user);
}

function pushTransac(transac, socket) {
  //var xformedTransac = transform(transac);
  //socket.emit('transaction', transac); // this is how it acknowledges the client
  var newTransac = new es.TransactionModel( transac['operations'] );
  newTransac['lengthDifference'] = transac['lengthDifference'];
  window.surfaceModel.transact( newTransac, true );

  socket.broadcast.emit('transaction', transac);
}

var io = require('socket.io').listen(8080);
io.sockets.on('connection', function(socket) {
  //maybe do something on new client?
  socket.on('user', function(user) {
    socket.set('username', user, function() {
      pushUser( user, socket );
      emitDocument( socket );
      if( !editor ) {
        editor = user; 
      }
    });
  });
  socket.on('disconnect', function() {
    username = socket.get('username', function(err, name) {
      socket.broadcast.emit( 'logout', name );
      users.splice( users.indexOf( name ), 1 );
      if( editor==name ) {
        editor = null;
      }
    });
  });

  socket.on('transaction', function(transaction) {
    console.log('new transaction: ' + JSON.stringify(transaction));
    //do something with the arrived transaction
    pushTransac(transaction, socket);
  });
});
