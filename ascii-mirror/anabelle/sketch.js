let capture;
var step = 12;
var symbols = "The blood of the martyrs is the seed of the Church.";
var draw_array = [];
var colors = [];
var capture_x = 800;
var capture_y = 500;
var draw_len = (capture_x * capture_y) / step;

function setup() {
  createCanvas(capture_x, capture_y);
  capture = createCapture(VIDEO);
  capture.size(capture_x, capture_y);
  textSize(step);
  frameRate(15);
  capture.hide();

  // noLoop();
}

function draw() {
  background('black');
  textSize(step);
  
  push();
  translate(width, 0);
  scale(-1, 1);

  image(capture, 0, 0, width, height);
  sampleFrame();
  
  pop();

  background('black');
  drawFrame();
}


function sampleFrame() {
  current_symbol = 0
  for (var i = 0; i < draw_len; i++){
    x = (step * i) % capture_x;
    y = floor((step * i) / capture_x);
    var c = get(x,y);
    var gs = rgbToGs(c[0], c[1], c[2]);
    // print(gs);
    // print(c);
    if (gs < 0.5 * 255) {
      draw_array[i] = symbols[current_symbol];
      current_symbol = (current_symbol + 1) % symbols.length;
    } else {
      draw_array[i] = " ";
    }
  }


  // print(draw_array);
}

function rgbToGs(r, g, b){
  return int(0.2126*r + 0.7152*g + 0.0722*b);
}

function drawFrame(){
    for (var i = 0; i < draw_len; i++) {
        x = (i % width) * step;
        y = floor(i / width) * step;

        if (x < width/2) {
          fill('red');
          text(draw_array[i], x, y);
        } else {
          if (draw_array[i] == " ") continue;
          else {
            fill('white');
            text('□', x, y);
          }
        }
    }
}

function keyPressed(){
  if (keyCode == RETURN){
    var l = symbols.length;
    symbols += " ";
    typing = false;
  } else if (typing == true){
    if (key == 'Backspace'){
      symbols = symbols.slice(0, -1);
    } else if (key.length > 1){
      return;
    }
    else {
      symbols += key;
    }
  }
}