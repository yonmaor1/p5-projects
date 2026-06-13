let capture;
let step = 7;
// let symbols = " .,;=!*#&@";
let symbols = "  .:!i*w#&W0@"
// symbols = " SPICE";
// let symbols = "1234567890";
let draw_array = [];
let colors = [];
let capture_x = 1080;
let capture_y = 1080;
let draw_len = (capture_x * capture_y) / step;

function mousePressed() {
  saveCanvas('sketch', 'png');
}

function preload() {
  capture = loadImage('star-anise.jpg');
}

function setup() {
  createCanvas(capture_x, capture_y);
  capture.resize(capture_x, capture_y);
  textSize(step);
  frameRate(15);
  textFont('monospace');
  // capture.hide();

  noLoop();
}

function draw() {
  background('black');
  image(capture, 0, 0, width, height);
  sampleFrame();
  background('white');

  push()
  // translate(width, height*0.05);
  drawFrame();
  pop();
}


function sampleFrame() {

  for (let i = 0; i < draw_len; i++){
    // step = map(i, 0, draw_len, 12, 20);
    x = (step * i) % capture_x;
    y = floor((step * i) / capture_x)
    let c = get(x,y);
    let gs = rgbToGs(c[0], c[1], c[2]);
    // print(gs);
    // print(c);
    // print(symbols)
    let symbol_index = int(map(gs, 0, 255, symbols.length - 1, 0)) // unsafe array access
    // print(symbol_index);
    draw_array[i] = symbols[symbol_index];
    colors[i] = c;
  }


  // print(draw_array);
}

function rgbToGs(r, g, b){
  return int(0.2126*r + 0.7152*g + 0.0722*b);
}

let noiseScale = 0;
function drawFrame(){
  push()
  // translate(width*0.05, height*0.05);
  // scale(0.9);
  for (let i = 0; i < draw_len; i++) {
      x = (i % (width)) * step + (noise(i*0.1)-0.5)*noiseScale;
      y = floor(i / (width)) * step + (noise(i*0.1 + 1000)-0.5)*noiseScale;

      textSize(step + (noise(i*0.1)-0.5)*noiseScale);
      fill('black');
      text(draw_array[i], x, y);
  }
  pop()
}