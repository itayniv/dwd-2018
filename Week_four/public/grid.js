var lastClicked;
var clicked;

var liststate = {};
var objectstate = [];

var height = -1;
var width = -1;
var synth;




$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {
  width = data.width;
  height = data.height;
  //data.gridState
  for (var m = 0; m < (height*width);  ++m){
    //console.log(window.location.href)
    objectstate.push(m);
    objectstate[m] = 0;
  }

  var grid = clickableGrid(height,width,function(el,row,col,i){
    // console.log("You clicked on element:",el);
    // console.log("You clicked on row:",row);
    // console.log("You clicked on col:",col);
    // console.log("You clicked on item #:",i);

  });
  document.body.appendChild(grid);

});



//state array
function clickableGrid( rows, cols, callback ){

  var i=1;  //first number

  var grid = document.createElement('table');
  grid.className = 'grid';

  for (var r=0;r<rows;++r){
    //nested for loop
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c=0;c<cols;++c){
      var cell = tr.appendChild(document.createElement('td'));
      cell.innerHTML = i++ ;      //add content to cells
      cell.id = "cell_"+i;

      cell.addEventListener('click',(function(el,r,c,i){
        return function(){
          if (liststate[i]!==1){
            liststate[i] = 1;
            objectstate[i] = 1;
            console.log("cell # " + (i-1) +"is " +   liststate[i]);
            el.className='clicked';
            //tone.js
            synth = new Tone.Synth().toMaster();
            synth.triggerAttackRelease(440 * Tone.intervalToFrequencyRatio(i-60), '6n');
            var jsonString = JSON.stringify(objectstate);

            //document.getElementById("demo").innerHTML = jsonString;

            //  ajax request'
            console.log('ajaxing the state on click of '+ (i-1) + ' == 1', objectstate)
            $.ajax({
              url: "/updateCell",
              type: 'post',
              data: {objectstate: JSON.stringify(objectstate)}
            }).done(function(data) {
              //console.log('data from server', data)
            });


          }else{
            el.className='';
            liststate[i] = 0;
            objectstate[i] = 0;
            var jsonString = JSON.stringify(objectstate);

            //document.getElementById("demo").innerHTML = jsonString;

            //  ajax request'

                    console.log('ajaxing the state on click of '+ (i-1) + ' == 0', objectstate)
                    $.ajax({
                      url: "/updateCell",
                      type: 'post',
                      data: {objectstate: JSON.stringify(objectstate)}
                    }).done(function(data) {
                      //console.log('data from server', data)
                      //console.log("kkkk");
                    });

          }
          callback(el,r,c,i);
        }
      }
    )(cell,r,c,i),false);


  }
}
return grid;
}
