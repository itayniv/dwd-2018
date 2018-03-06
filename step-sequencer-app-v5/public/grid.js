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
var synth = '';
var tempo = 120;
var globalTick = 0;
var thisNote = 1;
var userNo = 0;
var id = 0;
var checkId = false;

var audio = new AudioContext();


//////


function buildArrayForGridState(liststate, synth, i){

  if ((liststate[i-1].activated!==1)){
    liststate[i-1].activated = 1;
    liststate[i-1].instrument = 'synth01';
    liststate[i-1].color = synth;
    console.log('write to liststate:', liststate[i-1].activated, liststate[i-1].instrument, liststate[i-1].color);
    console.log(liststate[i-1]);
  }else {
    liststate[i-1].activated = 0;
    console.log('write to liststate:', liststate[i-1].activated, liststate[i-1].instrument, liststate[i-1].color);
    console.log(liststate[i-1]);
    //element.className='';
  }
  return liststate;
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

  function assignColor(){
    console.log(userNo);

    //
    // for (var f = 0; f < 9: f++){
    //
    // }

    if (userNo == 0){
      synth = 'white';
      console.log('synth', synth);
    }

    if (userNo == 1){
      synth = 'red';
      console.log('synth', synth);
    }

    if (userNo == 2){
      synth = 'yellow';
      console.log('synth', synth);
    }

    if (userNo == 3){
      synth = 'purple';
      console.log('synth', synth);
    }

    if (userNo == 4){
      synth = 'gold';
      console.log('synth', synth);
    }

    if (userNo == 5){
      synth = 'green';
      console.log('synth', synth);
    }

    if (userNo == 6){
      synth = 'salmon';
      console.log('synth', synth);
    }

    if (userNo == 7){
      synth = 'blue';
      console.log('synth', synth);
    }

    if (userNo == 8){
      synth = 'aqua';
      console.log('synth', synth);
    }

    if (userNo == 9){
      synth = 'darkgreen';
      console.log('synth', synth);
    }

    if (userNo == 10){
      synth = 'lightpink';
      console.log('synth', synth);
    }

    if (userNo == 11){
      synth = 'darkblue';
      console.log('synth', synth);
    }




  }
  assignColor();
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
          //Clicks on and off for Red

          newGridState = buildArrayForGridState(liststate, synth, i);

          socket.emit('sendStep', {'theData': newGridState});
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
  // console.log('got_newArr', seqarr)
});




///TODO check if I need this
if (checkId != true){
  console.log('checkID_State', checkId);
  checkId = true;
  socket.on('usercount', function(myId){

    id = myId;

  });

  console.log('checkID_State', checkId);
}
///////


socket.on('currplayer', function(incomingTick){
  //console.log('recieved Tick', incomingTick);
  globalTick = incomingTick;

  for(var i=0; i < width;i++){
    pattern01[i] = 0;
    document.getElementById("cell_"+(i+1)).classList.remove('player');
    document.getElementById("cell_"+(i+17)).classList.remove('player');
    document.getElementById("cell_"+(i+33)).classList.remove('player');
    document.getElementById("cell_"+(i+49)).classList.remove('player');
    document.getElementById("cell_"+(i+65)).classList.remove('player');
    document.getElementById("cell_"+(i+81)).classList.remove('player');
    document.getElementById("cell_"+(i+97)).classList.remove('player');
    document.getElementById("cell_"+(i+113)).classList.remove('player');
    document.getElementById("cell_"+(i+129)).classList.remove('player');
    document.getElementById("cell_"+(i+145)).classList.remove('player');
    document.getElementById("cell_"+(i+161)).classList.remove('player');
    document.getElementById("cell_"+(i+177)).classList.remove('player');
    document.getElementById("cell_"+(i+193)).classList.remove('player');

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
    //console.log('liststate 16 =', liststate[16]);
    //console.log('pattern01  =', liststate[0]);
    if ((liststate[i]==1) && (pattern01[i-(16*0)] == 1)){

      note1();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*1)] == 1)){
      note2();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*2)] == 1)){
      note3();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*3)] == 1)){
      note4();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*4)] == 1)){
      note5();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*5)] == 1)){
      note6();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*6)] == 1)){
      note7();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*7)] == 1)){
      note8();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*8)] == 1)){
      note9();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*9)] == 1)){
      note10();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*10)] == 1)){
      note11();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*11)] == 1)){
      note12();
    }

    if ((liststate[i]==1) && (pattern01[i-(16*12)] == 1)){
      note13();
    }


  }
});




//draw function
(function draw(){
  currbar = globalTick;
  liststate = seqarr;

  for(var i=0; i < width*height;i++){
    if (liststate[i] != null){
      //console.log(liststate[1].color);
      if (liststate[i].activated != null){
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'red') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedRed');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'red') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedRed');
        }

        if ( (liststate[i].activated == 1) && (liststate[i].color == 'yellow') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedYellow');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'yellow') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedYellow');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'purple') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedPurpule');
        }
        if ( (liststate[i].activated == 0) && (liststate[i].color == 'purple') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedPurpule');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'gold') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedGold');
        }
        if ( (liststate[i].activated == 0) && (liststate[i].color == 'gold') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedGold');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'green') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedGreen');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'green') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedGreen');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'salmon') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedSalmon');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'salmon') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedSalmon');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'blue') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedBlue');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'blue') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedBlue');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'aqua') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedAqua');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'aqua') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedAqua');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'darkgreen') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedDarkGreen');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'darkgreen') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedDarkGreen');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'lightpink') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedLightPink');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'lightpink') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedLightPink');
        }
        if ( (liststate[i].activated == 1) && (liststate[i].color == 'darkblue') ){
          document.getElementById("cell_"+(i+1)).classList.add('clickedDarkBlue');
        }

        if ( (liststate[i].activated == 0) && (liststate[i].color == 'darkblue') ){
          document.getElementById("cell_"+(i+1)).classList.remove('clickedDarkBlue');
        }
      }
    }


  }
  requestAnimationFrame(draw);
})();





/////////////////////////
////////////reset////////
////////////////////////

var body = document.querySelector('body');
body.onkeydown = function (e) {
  if ( !e.metaKey ) {
    e.preventDefault();
  }
  if (event.keyCode == 48){
    for(var i = 0; i < width*height ; i++){
      liststate[i].instrument = 'synth01';
      liststate[i].color = 'white';
      liststate[i].activated = 0;

      document.getElementById("cell_"+(i+1)).classList.add('unclicked');
    }
    socket.emit('sendStep', {'theData': liststate});
    console.log('reset');
  }
};



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
