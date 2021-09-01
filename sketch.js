//Global Variables
var ant_x;// X coordinate of the ant
var ant_y;//Y coordinate of the ant
var ant_dir;//The direction the ant will move/ is facing
// Making a 2D array to store and display pixels
var grid;

//In order to increase readability of code, instead of using numbers to show direction of ant movement, variables are used
var up = 0;
var down = 2;
var left = 3;
var right = 1; //so that increment/decrement of ant_dir corresponds to 90 degrees of clockwise/anticlockwise turns

function setup() {
  createCanvas(800, 800);
  //Initialize the ant to start at the centre of the screen
  ant_x = width/2;
  ant_y = height/2;

  //Make the ant's starting direction random
  orientation_ant = [up, down, left, right];
  ant_dir = random(orientation_ant);
  
  

}
grid = new Array(800);
  for (var i = 0; i < grid.length; i++) {
    grid[i] = new Array(800);
    for (var j = 0; j < grid[i].length; j++) {
      grid[i][j] = 0; //Each pixel on the screen corresponds to one element; the value of this element decides the pixel color
    }
  }

//Implement functions for the rules
//* At a white square, turn 90° clockwise, flip the color of the square, move forward one unit
//* At a black square, turn 90° counter-clockwise, flip the color of the square, move forward one unit

function turn_Clockwise(){
ant_dir++;
if(ant_dir > left){
  ant_dir = up;
}

}
function turn_antiClockwise(){
  ant_dir --;
  if(ant_dir < up){
  ant_dir = left;}
  
}
function move_forward(){
  if(ant_dir == up){
    ant_y--;
  }else if(ant_dir == right){
    ant_x++;
  }else if(ant_dir == down){
    ant_y++;
  }else if(ant_dir == left){
    ant_x--;
  }

//If the ant crosses the boundary of the screen, bring it back to the centre
   if(ant_x > width -1 || ant_y > height -1 || ant_x <0 || ant_y < 0){
    ant_x = width/2;
    ant_y = height/2;
    //we use -1 so that ant_x or ant_y never exceeds the largest index of the array
  }

}


function draw() {
  strokeWeight(1);//Should only be 1 pixel wide
  for (var t = 0; t < 100; t++) { //n sets the speed of the ant - alloing it to draw more pixels per frame shown
    var state = grid[ant_x][ant_y];
    if (state == 0) {//If the pixel is white, turn Clockwise, invert color
      turn_Clockwise();
      grid[ant_x][ant_y] = 1;
    } else if (state == 1) {//If the pixel is black, turn Anticlockwise, invert color
      turn_antiClockwise();
      grid[ant_x][ant_y] = 0;
    }

    
    if (grid[ant_x][ant_y]) {
      stroke(color(0));//If value is 1, make pixel black
    } else{
      stroke(color(255));//If value is 0, make pixel white
    }
    point(ant_x, ant_y);//Draw the pixel as a point
    move_forward();
  }

}
function mouseClicked(){ //Changes ant's position to cursor
  if(mouseX > 0 && mouseX < width-1 && mouseY> 0 && mouseY < height -1){
    ant_x = mouseX;
    ant_y = mouseY;
  }
 

}
