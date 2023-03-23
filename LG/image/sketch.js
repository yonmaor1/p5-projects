let capture;
var step = 12;
var symbols = " .,;=!*#&@";
var symbols = "  .:!i*w#&W0@"
// var symbols = "1234567890";
var draw_array = [];
var colors = [];
var capture_x = 1000;
var capture_y = 700;
var draw_len = (capture_x * capture_y) / step;
var sample_step = 5;

var imgLinks = [
  "Olivia-Luk.jpeg",
  "Leo-Deng.jpeg",
  "Arin-Pantja.jpeg" 
]

var imgs = [];
var w = 1280 / 5;
var h = 1920 / 5;

function preload() {
  //populates Img arrays
  for (var i = 0; i < imgLinks.length; i++) {
    img = loadImage(imgLinks[i]);
    imgs.push(img);
  }

  // w = img.width;
  // h = img.height;

  print(h);
}

function setup() {
  createCanvas(capture_x, capture_y);
  textSize(step);
  frameRate(15);

  // img = imgs[0];
  // image(img, 0, 0, w, h);
  // for (let i = 0; i < w; i++) {
  //   let c = get(i, h / 2);
  //   stroke(c);
  //   line(i, height / 2, i, height);
  // }

  // noLoop();
}

function draw() {
  drawingContext.filter = 'blur(0px)';
  background('black');
  push();
  translate((width - 3.4*w) / 2, (height - h) / 2);
  image(imgs[0], 0, 0, w, h);
  // for (let i = 0; i < h; i++) {
  //   let c = get(mouseX - 30 + ((width - 3.4*w) / 2), i+ ((height - h) / 2));
  //   print(c);
  //   stroke(c);
  //   line(mouseX - 30, i, 0, i);

  //   c = get(mouseX + 30 + ((width - 3.4*w) / 2), i+ ((height - h) / 2));
  //   stroke(c);
  //   line(mouseX + 30, i, w, i);
  //   // line(i, height / 2, i, height);
  // }
  // drawingContext.filter = 'blur(4px)';
  for (let i = 0; i < h; i++) {
    let c = get(mouseX - 30 + ((width - 3.4*w) / 2), i + ((height - h) / 2));
    c[3] = 220;
    //print(c);
    stroke(c);
    line(mouseX - 30, i, 0, i);

    c = get(mouseX + 30 + ((width - 3.4*w) / 2), i+ ((height - h) / 2));
    c[3] = 220;
    stroke(c);
    line(mouseX + 30, i, w, i);
    // line(i, height / 2, i, height);
  }
  pop();

}

function __draw() {
  background('black');

  push();
  translate((width - 3.4*w) / 2, (height - h) / 2);
  relX = mouseX + (width - 3.4*w) / 2;
  relY = mouseY + (height - h) / 2;

  image(imgs[0], 0, 0, w, h);
  image(imgs[1], 1.2*w, 0, w, h);
  image(imgs[2], 2.4*w, 0, w, h);

  pop();

  if (0 <= relY && relY <= h){
    if (0 <= relX && relX <= w){
      for (let i = 0; i < imgs[0].height; i++) {
        let c = img.get(mouseX, i);
        stroke(c);
        line(mouseX, i, w, i);
        // line(i, height / 2, i, height);
      }
    } if (1.2*w <= relX && relX <= 1.2*w+w){
      
    } if (2.4*w <= relX && relX <= 2.4*w+w){
      
    }
  }

  // if (0 <= relY && relY <= h){
  //   if (0 <= relX && relX <= w){
  //     push();
  //     translate((width - 3.4*w) / 2, (height - h) / 2);

  //     sampleFrame(0, 0);
  //     drawFrame(0, 0);

  //     pop();
  //   } if (1.2*w <= relX && relX <= 1.2*w+w){
  //     push();
  //     translate((width - 3.4*w) / 2, (height - h) / 2);

  //     sampleFrame(1.2*w, 0);
  //     drawFrame(1.2*w, 0);

  //     pop();
  //   } if (2.4*w <= relX && relX <= 2.4*w+w){
  //     push();
  //     translate((width - 3.4*w) / 2, (height - h) / 2);

  //     sampleFrame(2.4*w, 0);
  //     drawFrame(2.4*w, 0);

  //     pop();
  //   }
  // }
  
  //
  //background('black');
  //drawFrame();

  // pop();
}


function sampleFrame(startX, startY) {

  var i = 0;
  for (var y = startY; y < startY + h; y += sample_step){
    for (var x = startX; x < startX + w; x += sample_step){
      
      var c = get(x,y);
      var gs = rgbToGs(c[0], c[1], c[2]);
      // print(gs);
      // print(c);
      var symbol_index = floor(map(gs, 0, 255, symbols.length - 1, 0)) // unsafe array access
      // print(symbol_index);
      draw_array[i] = symbols[symbol_index];
      colors[i] = c;
      i++;
    }
  }


  // print(draw_array);
}

function drawFrame(startX, startY){
  push()
  
  translate(startX, startY);
  fill('black');
  rect(0, 0, w, h);

  fill('white');
  var i = 0;
  for (var y = 0; y < h; y += sample_step){
    for (var x = 0; x < w; x += sample_step){

      // fill('white');
      // text(draw_array[i], x, y);

      if (colors[i] != undefined) fill(colors[i]);
      ellipse(x, y, 10);
      i++;
    }
  }

  pop();
}

function rgbToGs(r, g, b){
  return int(0.2126*r + 0.7152*g + 0.0722*b);
}