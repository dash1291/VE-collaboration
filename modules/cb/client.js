//Script to establish websocket connection with the nodeJS collaboration server
//Requires socket.io.js

var user = null;
while( !user ) {
  user = prompt('Username');
}
var socket = io.connect('http://ec2-23-20-65-141.compute-1.amazonaws.com:8080');
socket.emit('user', user);
var bufferQueue;
var readonly = false;
function addUser(user) {
  //TODO::add user to the users list
}

function init( data ) {
  if( data['editor'] ) {
    console.log(data['editor']);
    var markup = $('#firstHeading').html() + 
                  '<small><span><b> (Read-only mode;<b></span><span> Currently editing:' + 
                  '</span><span style="color:red">' +
                   data['editor'] + ')</span></small>';
    $("#firstHeading").html(markup);
    readonly = true;
  }
  var newDocumentModel = new es.DocumentModel( JSON.parse( data['doc'] ) );
  window.documentModel.data.splice( 0, documentModel.data.length );
  es.insertIntoArray( window.documentModel.data, 0, newDocumentModel.data );
  window.surfaceModel.select( new es.Range( 1, 1 ) );
  window.documentModel.splice.apply(
    window.documentModel,
    [0, window.documentModel.getChildren().length]
      .concat( newDocumentModel.getChildren() )
  );
  window.surfaceModel.purgeHistory();
}

function applyTransac(transac) {
  //TODO::apply transaction to the linear model
  var newTransac = new es.TransactionModel( transac['operations'] );
  newTransac['lengthDifference'] = transac['lengthDifference'];
  window.surfaceView.model.transact( newTransac, true );
}
socket.on('connection', function() {
});

socket.on('init', function( data ) {
  init( data );
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

