//Script to establish websocket connection with the nodeJS collaboration server
//Requires socket.io.js

var user = null;
var users = [];
while( !user ) {
  user = prompt('Username');
}
var socket = io.connect('http://ec2-23-20-65-141.compute-1.amazonaws.com:8080');
socket.emit('user', user);
var bufferQueue;
var readonly = true;

function addUser(user) {
  users.push( user );
  var markup = $('#cb-activity').html() +
                '<p><span style="font-weight: bold">' + user + 
                '</span> joined the session.</p>';
  $("#cb-activity").html( markup );
  //TODO::add user to the users list
}

function removeUser(user) {
  users.splice( users.indexOf( user ) );
  var markup = $('#cb-activity').html() +
                '<p><span style="font-weight: bold">' + user + 
                '</span><span style="color: red"> left the session.</span></p>';
  $("#cb-activity").html( markup );
  //TODO::add user to the users list
}

function init( data ) {
  if( data['editor'] ) {
    var editor = data['editor'];
    var markup = $('#firstHeading').html() + 
                  '<small><span><b> (Read-only mode;<b></span><span> Currently editing:' + 
                  '</span><span style="color:red">' +
                   editor + ')</span></small>';
    $("#firstHeading").html(markup);
  }
  else {
    readonly = false;
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
  addUser(user);
});

socket.on('transaction', function(transac) {
  console.log('transaction: ' + transac);
  applyTransac(transac);
});

socket.on('logout', function(user) {
  removeUser( user );
});
var onTransaction = function(transac) {
  //TODO::attach parentHash and localID to the transac
  socket.emit('transaction', transac);
};

