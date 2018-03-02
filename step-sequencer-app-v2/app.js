var express = require('express');
var http = require('http');
var path = require("path");
var io = require('socket.io');
var bodyParser = require('body-parser')
var express = require('express');
var Metronome = require('timepiece').Metronome;
var currplayer = 0;
var appTempo = 200;

// var mongojs = require('mongojs');

var app = express();
var server  = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var width = 16;
var height = 1;
var seqarraystate = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

//TODO create an array from var width and height

var port = process.env.PORT || 3000;


app.get('/GetGridSize', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  var obj = {
    "array": seqarraystate,
    "width": width,
    "height": height
  }
  res.send(obj)
});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});


var sockets = io(server);
// configure socket handlers
sockets.on('connection', function(socket){
  //Hi this is all the users connected
  sockets.emit('usercount', sockets.engine.clientsCount);
  console.log('User num: ', sockets.engine.clientsCount);

  console.log('a user connected');
  socket.on('sendStep', function(data){
    seqarraystate = data.theData;
    sockets.emit('sendSteps', seqarraystate);
    // console.log('emmiting array', seqarraystate);
  });

  socket.on('disconnect', function(){
    //Hi somebody dissconencted we have a different count!
    sockets.emit('usercount', sockets.engine.clientsCount);
    console.log('User num: ', sockets.engine.clientsCount);
  });
//   setTimeout(function() {
//   io.sockets.emit('message');
// }, 1000 );

});


////////////////tempo///////////
// By default, a metronome object is set to 60 bpm.
var metronome = new Metronome();
// But you could also initialize one at another tempo.
// It emits a 'tick' event on each beat
metronome.set(200);

metronome.on('tick', function(){
  //console.log(metronome.bpm + ' bpm');
  //currplayer = Math.floor((new Date()).getTime()%(width*appTempo)/appTempo);
  currplayer ++;
  if (currplayer == 16){
    currplayer = 0;
  }
    sockets.emit('currplayer', currplayer);
    //CLient should look like this!
    // client.on('currplayer', function(n,z,b){
    //
    // })
    // console.log('yay');
  // console.log('currPlayer ', currplayer);

  //TODO///this is where I want to Emit to sockets

});
metronome.start();
////////////////tempo///////////
