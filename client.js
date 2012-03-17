//Script to establish websocket connection with the nodeJS collaboration server
//Requires socket.io.js

var user = 'Ashish';
var socket = io.connect('http://localhost:8080');
var bufferQueue;

function addUser(user) {
  //TODO::add user to the users list
}

function init( doc ) {
  window.documentModel = es.DocumentModel.newFromPlainObject( doc );
  window.surfaceModel = new es.SurfaceModel( window.documentModel );
  window.surfaceView = new es.SurfaceView( $( '#es-editor' ), window.surfaceModel );
  window.toolbarView = new es.ToolbarView( $( '#es-toolbar' ), window.surfaceView );
  window.contextView = new es.ContextView( window.surfaceView );
  window.surfaceModel.select( new es.Range( 1, 1 ) );
}

function applyTransac(transac) {
  //TODO::apply transaction to the linear model
  var newTransac = new es.TransactionModel( transac['operations'] );
  newTransac['lengthDifference'] = transac['lengthDifference'];
  window.surfaceView.model.transact( newTransac, true );
}
socket.on('connection', function() {
  socket.emit('user', user);
});

socket.on('init', function(doc) {
 // init(doc);
});

socket.on('user', function(user) {
  console.log('new user: ' + user);
  //addUser(user);
});

socket.on('transaction', function(transac) {
  console.log('transaction: ' + transac);
  applyTransac(transac);
});

var onTransaction = function(transac) {
  //TODO::attach parentHash and localID to the transac
  socket.emit('transaction', transac);
};
