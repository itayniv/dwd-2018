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
var arrayrecieved = false;

var audio = new AudioContext();

for (var i = 0; i < width*height; i++){
  //seqarraystate[i] = [];
  liststate[i] = {instrument: '',
                  color: 'white',
                  activated: 0,
                  serverUID: 0};
}
console.log("liststate initialized")


//////


function buildArrayForGridState(liststate, synth, i){
  if ((liststate[i-1].activated!==1)){
    liststate[i-1].activated = 1;
    if (synth == 'red'){
      liststate[i-1].instrument = 'synth01';
    }
    if (synth == 'yellow'){
      liststate[i-1].instrument = 'synth02';
    }
    if (synth == 'purple'){
      liststate[i-1].instrument = 'synth03';
    }
    if (synth == 'gold'){
      liststate[i-1].instrument = 'synth04';
    }
    if (synth == 'green'){
      liststate[i-1].instrument = 'synth05';
    }
    if (synth == 'salmon'){
      liststate[i-1].instrument = 'synth06';
    }
    if (synth == 'blue'){
      liststate[i-1].instrument = 'synth07';
    }
    if (synth == 'aqua'){
      liststate[i-1].instrument = 'synth08';
    }
    if (synth == 'aqua'){
      liststate[i-1].instrument = 'synth09';
    }
    if (synth == 'darkgreen'){
      liststate[i-1].instrument = 'synth10';
    }
    if (synth == 'lightpink'){
      liststate[i-1].instrument = 'synth11';
    }
    if (synth == 'darkblue'){
      liststate[i-1].instrument = 'synth12';
    }


    liststate[i-1].color = synth;
    //console.log('write to liststate:', liststate[i-1].activated, liststate[i-1].instrument, liststate[i-1].color);
    console.log('Liststate on Click',liststate[i-1]);
  }else {
    liststate[i-1].activated = 0;
    //console.log('write to liststate:', liststate[i-1].activated, liststate[i-1].instrument, liststate[i-1].color);
    //console.log(liststate[i-1]);
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
    //console.log(userNo);

    //
    // for (var f = 0; f < 9: f++){
    //
    // }

    if (userNo == 0){
      synth = 'white';
      console.log('you are ', synth);
    }

    if (userNo == 1){
      synth = 'red';
      console.log('you are ', synth);
    }

    if (userNo == 2){
      synth = 'yellow';
      console.log('you are ', synth);
    }

    if (userNo == 3){
      synth = 'purple';
      console.log('you are ', synth);
    }

    if (userNo == 4){
      synth = 'gold';
      console.log('you are ', synth);
    }

    if (userNo == 5){
      synth = 'green';
      console.log('you are ', synth);
    }

    if (userNo == 6){
      synth = 'salmon';
      console.log('you are ', synth);
    }

    if (userNo == 7){
      synth = 'blue';
      console.log('syou are ', synth);
    }

    if (userNo == 8){
      synth = 'aqua';
      console.log('you are ', synth);
    }

    if (userNo == 9){
      synth = 'darkgreen';
      console.log('you are ', synth);
    }

    if (userNo == 10){
      synth = 'lightpink';
      console.log('you are ', synth);
    }

    if (userNo == 11){
      synth = 'darkblue';
      console.log('you are ', synth);
    }


    document.getElementById("p1").innerHTML = '▣ You are the ' +synth+' synth ▣';

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
  arrayrecieved = true;
  console.log('got_newArr', arrayrecieved)
});




if (checkId != true){
  checkId = true;
  socket.on('usercount', function(myId){

    id = myId;
    document.getElementById("p2").innerHTML = '◨ '+ myId +' players in this session ◨';

  });
}
///////


socket.on('currplayer', function(incomingTick){
  globalTick = incomingTick;






  for(var i = 0; i < (width*height) ;i++){
    if (arrayrecieved == true){
        //  console.log(liststate[i].instrument);

          if(liststate[i].instrument = 'synth01'){

            if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
              note1_1();
              console.log('hit1.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
              note2_1();
              console.log('hit2.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
              note3_1();
              console.log('hit3.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
              note4_1();
              console.log('hit4.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
              note5_1();
              console.log('hit5.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
              note6_1();
              console.log('hit6.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
              note7_1();
              console.log('hit7.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
              note8_1();
              console.log('hit8.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
              note9_1();
              console.log('hit9.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
              note10_1();
              console.log('hit10.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
              note11_1();
              console.log('hit11.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
              note12_1();
              console.log('hit12.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
              note13_1();
              console.log('hit13.1');
            }
          }

          if(liststate[i].instrument = 'synth02'){

            if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
              note1_1();
              console.log('hit1.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
              note2_1();
              console.log('hit2.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
              note3_1();
              console.log('hit3.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
              note4_1();
              console.log('hit4.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
              note5_1();
              console.log('hit5.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
              note6_1();
              console.log('hit6.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
              note7_1();
              console.log('hit7.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
              note8_1();
              console.log('hit8.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
              note9_1();
              console.log('hit9.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
              note10_1();
              console.log('hit10.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
              note11_1();
              console.log('hit11.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
              note12_1();
              console.log('hit12.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
              note13_1();
              console.log('hit13.1');
            }
          }


          if(liststate[i].instrument = 'synth03'){

            if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
              note1_1();
              console.log('hit1.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
              note2_1();
              console.log('hit2.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
              note3_1();
              console.log('hit3.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
              note4_1();
              console.log('hit4.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
              note5_1();
              console.log('hit5.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
              note6_1();
              console.log('hit6.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
              note7_1();
              console.log('hit7.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
              note8_1();
              console.log('hit8.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
              note9_1();
              console.log('hit9.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
              note10_1();
              console.log('hit10.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
              note11_1();
              console.log('hit11.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
              note12_1();
              console.log('hit12.1');
            }

            if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
              note13_1();
              console.log('hit13.1');
            }
          }




                    if(liststate[i].instrument = 'synth04'){

                      if ((liststate[i].activated==1) && (pattern01[i-(16*0)] == 1)){
                        note1_1();
                        console.log('hit1.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*1)] == 1)){
                        note2_1();
                        console.log('hit2.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*2)] == 1)){
                        note3_1();
                        console.log('hit3.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*3)] == 1)){
                        note4_1();
                        console.log('hit4.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*4)] == 1)){
                        note5_1();
                        console.log('hit5.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*5)] == 1)){
                        note6_1();
                        console.log('hit6.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*6)] == 1)){
                        note7_1();
                        console.log('hit7.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*7)] == 1)){
                        note8_1();
                        console.log('hit8.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*8)] == 1)){
                        note9_1();
                        console.log('hit9.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*9)] == 1)){
                        note10_1();
                        console.log('hit10.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*10)] == 1)){
                        note11_1();
                        console.log('hit11.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*11)] == 1)){
                        note12_1();
                        console.log('hit12.1');
                      }

                      if ((liststate[i].activated==1) && (pattern01[i-(16*12)] == 1)){
                        note13_1();
                        console.log('hit13.1');
                      }
                    }



        }






  }



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
      //console.log('reset');
      //document.getElementById("cell_"+(i+1)).classList.add('unclicked');
      document.getElementById("cell_"+(i+1)).classList.add('notplayer');
    }
    socket.emit('sendStep', {'theData': liststate});

  }
};





///////////////////////////////
//*********RED SYNTH*********//
///////////////////////////////



function note1_1() {
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

function note2_1() {
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
function note3_1() {
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
function note4_1() {
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
function note5_1() {
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
function note6_1() {
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
function note7_1() {
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
function note8_1() {
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
function note9_1() {
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
function note10_1() {
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
  var Synth = new Tone.Synth().toMaster();

};
function note11_1() {
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
function note12_1() {
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
  var Synth = new Tone.Synth().toMaster();

};
function note13_1() {
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
  var Synth = new Tone.Synth().toMaster();
};







//////////////////////////////////
//*********YELLOW SYNTH*********//
//////////////////////////////////



function note1_2() {
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

  synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(thisNote*13), '9n');
  var Synth = new Tone.Synth().toMaster();
};

function note2_2() {
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

function note3_2() {
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

function note4_2() {
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

function note5_2() {
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

function note6_2() {
  var amSynth = new Tone.AMSynth({
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
  var amSynth = new Tone.AMSynth().toMaster();

};
function note7_2() {
  var amSynth = new Tone.AMSynth({
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
  var amSynth = new Tone.AMSynth().toMaster();

};
function note8_2() {
  var amSynth = new Tone.AMSynth({
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
  var amSynth = new Tone.AMSynth().toMaster();

};
function note9_2() {
  var amSynth = new Tone.AMSynth({
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
  var fmSynth = new Tone.AMSynth().toMaster();

};
function note10_2() {
  var amSynth = new Tone.AMSynth({
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
  var amSynth = new Tone.AMSynth().toMaster();

};
function note11_2() {
  var amSynth = new Tone.AMSynth({
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
  var fmSynth = new Tone.AMSynth().toMaster();

};
function note12_2() {
  var amSynth = new Tone.AMSynth({
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
  var amSynth = new Tone.AMSynth().toMaster();

};
function note13_2() {
  var amSynth = new Tone.AMSynth({
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
  var amSynth = new Tone.AMSynth().toMaster();
};
