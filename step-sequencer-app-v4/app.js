var express = require('express');
var http = require('http');
var path = require("path");
var io = require('socket.io');
var bodyParser = require('body-parser')
var express = require('express');
var Metronome = require('timepiece').Metronome;
var currplayer = 0;
var appTempo = 400;
var userID = 0;

// var colorScheme = {
//     pink : #F748C2,
//     red  : #F94646,
//     yellow  : #F9F315,
//     gold  : #F9B315,
//     ocean  : #F94646,
//     purple  : #A652CB,
//     green  : #B5F286,
//     greenish  : #B5F286,
// };
// var mongojs = require('mongojs');

var app = express();
var server  = http.createServer(app);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var width = 16;
var height = 13;
var seqarraystate = [];

//TODO create an array from var width and height

var port = process.env.PORT || 3000;

function init(){
  for (var i = 0; i < width*height; i++){
    seqarraystate[i] = [];
    //seqarraystate[i] = {instrument: 'synth01', color: 'white', activated: 0};
  }
}

init();

app.get('/GetGridSize', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  var obj = {
    "array": seqarraystate,
    "width": width,
    "height": height,
  //TODO get color function  "color": getColor()
  //TODO get synth
    "userNumber": userID
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
  userID = sockets.engine.clientsCount;
  sockets.emit('usercount', sockets.engine.clientsCount);
  console.log('User num: ', sockets.engine.clientsCount);
  socket.send(socket.id);


  //console.log('a user connected',socket.id);
  socket.on('sendStep', function(data){
    seqarraystate = data.theData;
    sockets.emit('sendSteps', seqarraystate);
  });

  socket.on('disconnect', function(){
    //Hi somebody dissconencted we have a different count!
    sockets.emit('usercount', sockets.engine.clientsCount);
    console.log('User num: ', sockets.engine.clientsCount);
  });




});







////////////////tempo///////////
// By default, a metronome object is set to 60 bpm.
var metronome = new Metronome();
// But you could also initialize one at another tempo.
// It emits a 'tick' event on each beat
metronome.set(appTempo);

metronome.on('tick', function(){
  //console.log(metronome.bpm + ' bpm');
  //currplayer = Math.floor((new Date()).getTime()%(width*appTempo)/appTempo);
  currplayer ++;
  if (currplayer == 16){
    currplayer = 0;
  }
    sockets.emit('currplayer', currplayer);

});
metronome.start();
////////////////tempo///////////
