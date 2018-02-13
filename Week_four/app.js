var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require("path");
var mongojs = require('mongojs');
var bodyParser = require('body-parser')

console.log('test')
var db = mongojs("cell-sequencer:Cell-sequencer1@ds225608.mlab.com:25608/dwd-2018", ["cellstate"]);
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var height = 10;
var width = 12;

var port = process.env.PORT || 3000;
var picked = []

app.post('/pick-number', function (req, res) {
  var num = 0;
  console.log("res");
  res.redirect('/');
});


app.post('/updateCell', function(req, res){
  const objectstate = JSON.parse(req.body.objectstate)
  console.log('the boject state', objectstate)
  db.cellstate.save({"cellarray":objectstate}, function(err, saved) {
    if ( err || !saved ) console.log("Not saved");
    else console.log("objectstate Saved");
    res.redirect('/');
  });
});


app.get('/getCell', function(req, res){
  db.cellstate.find().limit(1).sort({name: 1}, function(err, saved)  {
  //db.cellstate.find({}, function(err, saved) {
    if (err || !saved) {
      console.log("No results");
    }
    else {
      saved.forEach(function(record) {
        console.log('Fetched recent array from server');
        console.log(record);
      });
  }
});
});




app.get('/GetGridSize', function(req,res){
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ "width": width, "height":height }));

});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
