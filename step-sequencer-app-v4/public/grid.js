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
var globalTick = 0;
var thisNote = 1;
var userNo = 0;
var id = -1;
var checkId = false;

var audio = new AudioContext();

var playerParameters = [{synth : synth1, color: 'blue'}, {synth : synth2, color: 'green'}]

function parametersFromId(id){
  return playerParameters[id % playerParameters.length]
}


$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  width = data.width;
  height = data.height;
  seqarr = data.array;
  userNo = data.userNumber;

  var grid = clickableGrid(height,width, function(element,row,col,i){
    //console.log(element);
    //console.log(row);
    //console.log(col);
    //console.log(i);
  });
  // init();
  document.body.appendChild(grid);
});

console.log(userNo);
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
          if (!liststate[i-1].includes(myId)){
            liststate[i-1].push(myId)
            //element.className='clicked';
          }else{
            if (liststate[i-1].includes(myId)){
              liststate[i-1].splice(liststate[i-1].indexOf(myId), 1)
            }

            //element.className='';
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
  seqarr = steps;
  //console.log('got_newArr', seqarr)
});


if (checkId != true){
  checkId = true;
  console.log(checkId);
  socket.on('usercount', function(myId){

    id = myId;
    console.log(myId);
    if (id == 0){
      console.log('purple');
    }
    if (id == 1){
      console.log('blue');
    }
    if (id == 2){
      console.log('green');
    }
    if (id == 3){
      console.log('red');
    }
  });

  console.log(checkId);
}



socket.on('currplayer', function(incomingTick){
  //console.log('recieved Tick', incomingTick);
  globalTick = incomingTick;

  for(var i=0; i < width;i++){
    pattern01[i] = 0;
    for (var y = 0; y < height; y++){
      document.getElementById("cell_"+(y * height + i)).classList.remove('player');
    }
    // document.getElementById("cell_"+(i+17)).classList.remove('player');
    // document.getElementById("cell_"+(i+33)).classList.remove('player');
    // document.getElementById("cell_"+(i+49)).classList.remove('player');
    // document.getElementById("cell_"+(i+65)).classList.remove('player');
    // document.getElementById("cell_"+(i+81)).classList.remove('player');
    // document.getElementById("cell_"+(i+97)).classList.remove('player');
    // document.getElementById("cell_"+(i+113)).classList.remove('player');
    // document.getElementById("cell_"+(i+129)).classList.remove('player');
    // document.getElementById("cell_"+(i+145)).classList.remove('player');
    // document.getElementById("cell_"+(i+161)).classList.remove('player');
    // document.getElementById("cell_"+(i+177)).classList.remove('player');
    // document.getElementById("cell_"+(i+193)).classList.remove('player');

    }

  pattern01[currbar] = 1;
  document.getElementById("cell_"+(currbar+1)).classList.add('player');
  document.getElementById("cell_"+(currbar+17)).classList.add('player');
  document.getElementById("cell_"+(currbar+33)).classList.add('player');
  document.getElementById("cell_"+(currbar+49)).classList.add('player');
  document.getElementById("cell_"+(currbar+65)).classList.add('player');
  document.getElementById("cell_"+(currbar+81)).classList.add('player');
  document.getElementById("cell_"+(currbar+97)).classList.add('player');
  document.getElementById("cell_"+(currbar+113)).classList.add('player');
  document.getElementById("cell_"+(currbar+129)).classList.add('player');
  document.getElementById("cell_"+(currbar+145)).classList.add('player');
  document.getElementById("cell_"+(currbar+161)).classList.add('player');
  document.getElementById("cell_"+(currbar+177)).classList.add('player');
  document.getElementById("cell_"+(currbar+193)).classList.add('player');



  for(var i=0; i < (width*width) ;i++){
    //if cell is active at this index
    //triggerSynth at that index



    //console.log('liststate 16 =', liststate[16]);
    //console.log('pattern01  =', liststate[0]);
    if ((liststate[i]==1) && (pattern01[i-(16*0)] == 1)){
      //console.log('hit0');
      note1();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*1)] == 1)){
      //console.log('hit1');
      note2();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*2)] == 1)){
      //console.log('hit2');
      note3();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*3)] == 1)){
      //console.log('hit3');
      note4();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*4)] == 1)){
      //console.log('hit4');
      note5();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*5)] == 1)){
      //console.log('hit5');
      note6();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*6)] == 1)){
      //console.log('hit6');
      note7();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*7)] == 1)){
      //console.log('hit7');
      note8();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*8)] == 1)){
      //console.log('hit8');
      note9();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*9)] == 1)){
      //console.log('hit9');
      note10();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*10)] == 1)){
      //console.log('hit10');
      note11();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*11)] == 1)){
      //console.log('hit11');
      note12();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*12)] == 1)){
      //console.log('hit12');
      note13();
    }
  }
});





var body = document.querySelector('body');

body.onkeydown = function (e) {
  if ( !e.metaKey ) {
    e.preventDefault();
  }
  if (event.keyCode == 82){
    for(var i = 0; i < width*height ; i++){
      liststate[i] = 0;
      document.getElementById("cell_"+(i+1)).classList.add('unclicked');
    }
    socket.emit('sendStep', {'theData': liststate});
    console.log('reset');
  }
};






//draw function
(function draw(){
  currbar = globalTick;
  liststate = seqarr;
  for(var i=0; i < width*height;i++){

    if (id == 0){
      if(liststate[i] == 1) {
        document.getElementById("cell_"+(i+1)).classList.add('clickedPurple');
        //console.log('clickes');
      }
      if(liststate[i] == 0){
        document.getElementById("cell_"+(i+1)).classList.remove('clickedPurple');
        //console.log('remove');
      }
    }

  if (id == 1){
    if(liststate[i] == 1) {
      document.getElementById("cell_"+(i+1)).classList.add('clickedYellow');
      //console.log('clickes');
    }
    if(liststate[i] == 0){
      document.getElementById("cell_"+(i+1)).classList.remove('clickedYellow');
      //console.log('remove');
    }
  }

  if (id == 2){
    if(liststate[i] == 1) {
      document.getElementById("cell_"+(i+1)).classList.add('clickedRed');
      //console.log('clickes');
    }
    if(liststate[i] == 0){
      document.getElementById("cell_"+(i+1)).classList.remove('clickedRed');
      //console.log('remove');
    }
  }


  }
  requestAnimationFrame(draw);
})();





//TODO move all synth data from noteX functions
var allSynths = [
  {
    synth : new Tone.Synth({
      oscillator : {
        type : "fatsquare3"
      },
        envelope : {
        attack : .1,
        decay : 1,
        sustain : 0.3,
        release : 1
      }
    }).toMaster(),
    note : 440 * Tone.intervalToFrequencyRatio(thisNote*13),
    duration : '9n'
  }
]

function triggerSynth(index){
  var obj = allSynths[index]
  obj.synth.triggerAttackRelease(obj.note, obj.duration)
}



function note1() {
  var synth = new Tone.Synth({
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

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*13), '9n');
  var Synth = new Tone.Synth().toMaster();

};

function note2() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*12), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note3() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*11), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note4() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*10), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note5() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*9), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note6() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*8), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note7() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*7), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note8() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*6), '9n');
  var Synth = new Tone.Synth().toMaster();

};
function note9() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*5), '9n');
  var fmSynth = new Tone.Synth().toMaster();

};
function note10() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*4), '9n');
  var fmSynth = new Tone.Synth().toMaster();

};
function note11() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*3), '9n');
  var fmSynth = new Tone.Synth().toMaster();

};
function note12() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*2), '9n');
  var fmSynth = new Tone.Synth().toMaster();

};
function note13() {
  var synth = new Tone.Synth({
    oscillator : {
      type : "fatsquare3"
    },
    envelope : {
    attack : 1.2,
    decay : .2,
    sustain : 0.3,
    release : 1.9
    }
  }).toMaster()

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*1), '9n');
  var fmSynth = new Tone.Synth().toMaster();

};









///////////////////
//
// ///////
//
// var mousedownID = -1;  //Global ID of mouse down interval
// function mousedown(event) {
//   if(mousedownID==-1)  //Prevent multimple loops!
//      mousedownID = setInterval(whilemousedown, 100 /*execute every 100ms*/);
// }
// function mouseup(event) {
//    if(mousedownID!=-1) {  //Only stop if exists
//      clearInterval(mousedownID);
//      mousedownID=-1;
//    }
// }
//
//
// function whilemousedown() {
//
//     thisNote ++;
//     if (thisNote >= 12){
//       thisNote = 0;
//     }
//     console.log('thisNote', thisNote);
// }
// //Assign events
// document.addEventListener("mousedown", mousedown);
// document.addEventListener("mouseup", mouseup);
// //Also clear the interval when user leaves the window with mouse
// document.addEventListener("mouseout", mouseup);





/////button


//
// // 1. Create the button
// var button = document.createElement("button");
// button.innerHTML = "reset grid";
//
// // 2. Append somewhere
// var body = document.getElementsByTagName("body")[0];
// body.appendChild(button);
//
// // 3. Add event handler
// button.addEventListener ("click", function() {
//   for(var i = 0; i < width*height ; i++){
//     liststate[i] = 0;
//     document.getElementById("cell_"+(i+1)).classList.add('unclicked');
//
//   }
//   socket.emit('sendStep', {'theData': liststate});
// });
