var express = require('express');
var app = express();
var path = require("path");

app.use(express.static('public'));

var count = 0;

var thesubmissions = [];

var checkedBoxes = {};

checkboxes[5] = true;
checkboxes[5] = false;



// *************************
// SETUP
// *************************

app.set("views", __dirname + '/views');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');
app.use(express.static( __dirname + '/public' ));

var port = process.env.PORT || 3000;


  app.get('/', function (req, res) {
    console.log('user enters..');
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
    // res.sendFile('index.html');
    // res.render('index');
    // res.send('Hello World!')
  });

app.get('/formpost', function(req, res) {
  //res.send("You submitted " + req.query.textfield);
  thesubmissions.push(req.query.textfield);
  res.redirect('/display');
});

app.get('/display', function(req, res) {
  var htmlout = "<html><body>";
  for (var i = 0; i < thesubmissions.length; i++) {
    htmlout = htmlout + thesubmissions[i] + "<br>";
  }
  var htmlout = htmlout + "</body></html>";
  res.send(htmlout);
});

app.get('/count', function(req, res) {
  count++;
  res.send("<html><body><h1>"+count+"</h1></body></html>");
});


app.get('/somethingelse', function(req, res) {
  res.send("Goodbye");

})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
