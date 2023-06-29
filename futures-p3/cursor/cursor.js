// let tl, tr, bl, br;
// let corner_images;
// let corners = [];
// let cursor;

// function preload() {
//   tl = loadImage('assets/tl.png');
//   tr = loadImage('assets/tr.png');
//   bl = loadImage('assets/bl.png');
//   br = loadImage('assets/br.png');

//   corner_images = [br, bl, tl, tr];
// }

function make_corner(cx, cy, cimg) {
  let co = {
    x: cx, y: cy,
    img: cimg,
    draw: corner_draw
  }
  return co;
}

function corner_draw(){
  // ellipse(this.x, this.y, 10); // debugging 
  image(this.img, this.x, this.y);
}

function make_cursor(cx, cy, cr, corner_arr) {
  let c = {
    x: cx, y: cy, r: cr,
    corners: corner_arr,
    draw: cursor_draw,
    move: cursor_move,
    speed: 7,
    active: false
  }

  return c;
}

function cursor_move(){
  if (this.active){
    this.r -= this.speed;
  } else {
    this.r += this.speed;
  }
  this.r = constrain(this.r, -45, 50);

  for (var i = 0; i < 4; i++){
    let theta = 45 + i*90;
    this.corners[i].x = this.r*cos(theta);
    this.corners[i].y = this.r*sin(theta);
  }

}

function cursor_draw(){
  push();
  translate(this.x, this.y);

  for (var i = 0; i < 4; i++){
    this.corners[i].draw();
  }

  pop();
}

// function setup() {
//   createCanvas(400, 400);
//   angleMode(DEGREES);
//   imageMode(CENTER);

//   for (var i = 0; i < 4; i++){
//     let theta = 45 + i*90;
//     let r = 50;
//     corners[i] = make_corner(r*cos(theta), r*sin(theta), corner_images[i]);
//   }

//   cursor = make_cursor(width/2, height/2, 50, corners);

// }

// function draw() {
//   background(220);


//   // ellipse(cursor.x, cursor.y, 10); // debugging
//   if (dist(mouseX, mouseY, width/2, height/2) < 50){
//     cursor.active = true;
//   } else {
//     cursor.active = false;
//   }

//   print(cursor.active);

//   cursor.move();
//   cursor.draw();

// }
