let capture;
var step = 12;
// var symbols = " .,;=!*#&@";
var symbols = "  .:!i*w#&W0@"
// var symbols = "1234567890";
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
  image(capture, 0, 0, width, height);
  sampleFrame();
  background('black');
  drawFrame();
}


function sampleFrame() {

  for (var i = 0; i < draw_len; i++){
    x = (step * i) % capture_x;
    y = floor((step * i) / capture_x);
    var c = get(x,y);
    var gs = rgbToGs(c[0], c[1], c[2]);
    // print(gs);
    // print(c);
    print(symbols)
    var symbol_index = int(map(gs, 0, 255, symbols.length - 1, 0)) // unsafe array access
    // print(symbol_index);
    draw_array[i] = symbols[symbol_index];
    colors[i] = c;
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

        fill('white');
        text(draw_array[i], x, y);
    }
}