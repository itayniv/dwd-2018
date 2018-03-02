var liststate = {};
var pattern01=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var lastClicked;
var clicked;
var currbar = 0;
var lastClicked;
var clicked;
var liststate = {};
var seqarr = [];
var height = -1;
var width = -1;
var synth;
var tempo = 120;


var audio = new AudioContext();


$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  width = data.width;
  height = data.height;
  seqarr = data.array;

  var grid = clickableGrid(height,width, function(element,row,col,i){
    //console.log(element);
    //console.log(row);
    //console.log(col);
    //console.log(i);
  });

  document.body.appendChild(grid);
});


//state array
function clickableGrid( rows, cols, callback ){
  var i=0; // first number
  var grid = document.createElement('table');
  grid.className = 'grid';
  for (var r=0;r<rows;++r){
    //nested for loop

    var tr = grid.appendChild(document.createElement('tr'));
    for (var c=0;c<cols;++c){
      var cell = tr.appendChild(document.createElement('td'));
      cell.innerHTML = 1+i++ ;      //add content to html cells
      cell.id = "cell_"+(i);    // assign an id based on i

      cell.addEventListener('click',
      (function(element,r,c,i){ //click listener function
        return function(){
                  if (liststate[i-1]!==1){
            element.className='clicked';
            liststate[i-1] = 1;
          }else{
            element.className='';
            liststate[i-1] = 0;
          }
            socket.emit('sendStep', {'theData': liststate});
          callback(element,r,c,i);
        }
      })(cell,r,c,i),false);
    }
  }
  return grid;
}

////////////////////
///socket handlers//
////////////////////
socket.on('sendSteps', function(steps){
  //console.log('recieved steps', steps, );
  //seqarr = steps;
  //console.log('seqarr ', seqarr);
  seqarr = steps;
});

socket.on('sendPlayer', function(player){
  console.log('recieved player', player);
  //seqarr = steps;
});


//////////////////
///tone js timer//
//////////////////

var loop = new Tone.Loop(function(time){
  //triggered every eighth note.

  //TODO synchronise to system clock
  //TODO make the clock trigger the currbar
  //currbar ++;

  currbar = Math.floor((new Date()).getTime()%(width*tempo)/tempo);

  // if (currbar == 16){
  //   currbar = 0;
  // }

  //console.log('currbar', currbar);
  for(var i=0; i < width;i++){
    pattern01[i] = 0;
    document.getElementById("cell_"+(i+1)).classList.remove('player');
  }

  pattern01[currbar] = 1;
  document.getElementById("cell_"+(currbar+1)).classList.add('player');
  for(var i=0; i < width;i++){
    if (pattern01[i] == 1 &&  liststate[i] == 1)
    note();

  }


}, "20n").start(0);
Tone.Transport.start();

//draw function
(function draw(){

  liststate = seqarr;

  for(var i=0; i < width;i++){
    if(liststate[i] == 0){
        document.getElementById("cell_"+(i+1)).classList.add('unclicked');
    }
    if(liststate[i] == 1) {
      document.getElementById("cell_"+(i+1)).classList.add('clicked');
    }
  }
  requestAnimationFrame(draw);
})();


function note() {

  var synth = new Tone.FMSynth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
      attack : .1,
      decay : 1,
      sustain : 0.3,
      release : 1
    }
  }).toMaster()

  synth.triggerAttackRelease('C4','22n')
  var fmSynth = new Tone.FMSynth().toMaster();
  console.log('playsound');

};
