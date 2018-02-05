var lastClicked;
var clicked;

var liststate = {};
var objectstate = [];

var height = 12;
var width = 12;

//state array

for (var m = 0; m < (height*width);  ++m){
  objectstate.push(m);
  objectstate[m] = 0;
  console.log(objectstate[m]);
}

var grid = clickableGrid(height,width,function(el,row,col,i){
  // console.log("You clicked on element:",el);
  // console.log("You clicked on row:",row);
  // console.log("You clicked on col:",col);
  // console.log("You clicked on item #:",i);

});


document.body.appendChild(grid);

function clickableGrid( rows, cols, callback ){

  var i=1;  //first number


  var grid = document.createElement('table');
  grid.className = 'grid';

  for (var r=0;r<rows;++r){                                           //nested 4 loop
    var tr = grid.appendChild(document.createElement('tr'));
    for (var c=0;c<cols;++c){
      var cell = tr.appendChild(document.createElement('td'));
      cell.innerHTML = i++ ;      //add content to cells

      //liststate.push(i);
      //event listeners
      //
      //     cell.addEventListener('mouseover',(function(el,r,c,i){
      //       return function(){
      //         el.className='hovered';
      //       }
      //     }
      //   )(cell,r,c,i),false);
      //
      //   cell.addEventListener('mouseout',(function(el,r,c,i){
      //     return function(){
      //       el.className='';
      //     }
      //   }
      // )(cell,r,c,i),false);

      cell.addEventListener('click',(function(el,r,c,i){
        return function(){
          if (liststate[i]!==1){
            liststate[i] = 1;
            objectstate[i] = 1;
            console.log("cell # " + (i-1) +"is " + objectstate[i]);
            el.className='clicked';
          }else{
            el.className='';
            liststate[i] = 0;
            objectstate[i] = 0;
            console.log("cell # " + (i-1) +"is " + objectstate[i]);
          }
          callback(el,r,c,i);
        }
      }
    )(cell,r,c,i),false);


  }
}
return grid;
}
