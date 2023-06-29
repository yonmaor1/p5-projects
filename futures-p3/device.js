let tl, tr, bl, br;
let corner_images;
let corners = [];
let CURSOR;
let bg, circuit, perf, earring;
let goblin;
let vid;
let playing = false;

function preload() {
  tl = loadImage('cursor/assets/tl.png');
  tr = loadImage('cursor/assets/tr.png');
  bl = loadImage('cursor/assets/bl.png');
  br = loadImage('cursor/assets/br.png');

  corner_images = [br, bl, tl, tr];

  bg = loadImage('assets/static.gif');
  bg.resize(windowWidth, windowHeight);

  goblin = loadFont('assets/fonts/GoblinOne-Regular.ttf');

  circuit = loadImage('assets/circuit.png');
  perf = loadImage('assets/perf-board.png');
  earring = loadImage('assets/earring.jpg');
  BOM = loadImage('assets/bill.png');

  vid = createVideo(['assets/demo2.mov']);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  angleMode(DEGREES);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);

  circuit.resize(circuit.width * 0.9, 0);
  earring.resize(earring.width * 0.9, 0);
  perf.resize(perf.width * 0.6, 0);
  BOM.resize(BOM.width * 0.6, 0);

  // vid.position(0, 800);
  vid.volume(0);
  vid.size(250, 400);
  vid.hide();
  print(vid.height);
  // vid.size(300, 300);
  // vid.position(0.0);

  for (var i = 0; i < 4; i++){
    let theta = 45 + i*90;
    let r = 50;
    corners[i] = make_corner(r*cos(theta), r*sin(theta), corner_images[i]);
  }

  cursor = make_cursor(width/2, height/2, 50, corners);
}

function draw() {
  background(220);

  push();
  translate(mouseX, mouseY);

  // draw_static(10);
  for (let i = 0; i < 3; i ++){
    for (let j = 0; j < 3; j++){
      image(bg, -windowWidth/2 + i*windowWidth/2, -windowHeight/2 + j*windowHeight/2);
    }
  }
  // stroke('black');
  // strokeWeight(2);

  fill('white');
  textSize(50);
  textFont(goblin);
  text('LEARN', -windowWidth/2, -windowHeight/2-150);
  text('MAKE', 0,               -windowHeight/2-150);
  text('TEACH', windowWidth/2,  -windowHeight/2-150);

  textSize(14);
  textAlign(CENTER, CENTER);
  // textFont('monospace');
  image(circuit, -windowWidth/2, -windowHeight/2 + 100);
  text("the device utilizes techniques in basic analog circuits,", -windowWidth/2, -windowHeight/2 + 300);
  text("physical computing, and electronics manufacturing. ", -windowWidth/2, -windowHeight/2 + 320);
  text("topics to study include:", -windowWidth/2, -windowHeight/2 + 320);
  text("- operational amplifiers", -windowWidth/2, -windowHeight/2 + 360);
  text("- amplifier design", -windowWidth/2, -windowHeight/2 + 380);
  text("- digital communication", -windowWidth/2, -windowHeight/2 + 400);
  text("- soldering and prototyping", -windowWidth/2, -windowHeight/2 + 420);

  text("resources in these feilds can be found here:", -windowWidth/2, -windowHeight/2 + 460);
  text("- opamp / amp design: Sedra/Smith Microelectronic Circuits" , -windowWidth/2, -windowHeight/2 + 480);
  text("(sectino I chp. 1-2)", -windowWidth/2, -windowHeight/2 + 500);
  text("- digital communication: https://libgen.is/book/index.php?md5=", -windowWidth/2, -windowHeight/2 + 520);
  text("C3009936C76CD3BB69B4893BF2B18B22", -windowWidth/2, -windowHeight/2 + 540);

  textAlign(LEFT, TOP);
  image(earring, -140, -windowHeight/2 + 240);
  text("building the device is easy", 20, -windowHeight/2 - 50);

  textSize(10);
  text("simply follow the included ", 20, -windowHeight/2 - 35);
  text("wiring diagram and bill of materials", 20, -windowHeight/2 - 25);
  text("solder components onto a", 20, -windowHeight/2 - 15);
  text("prototyping board", 20, -windowHeight/2 - 5);
  image(BOM, 20 + BOM.width/2, -windowHeight/2 + 200);
  image(perf, 20, -windowHeight/2 + 800);

  textAlign(CENTER, CENTER);
  textSize(12);
  text("arguably more important then making or waring the device", windowWidth/2, -windowHeight/2 - 35);
  text("is sharing the knowlage with others", windowWidth/2, -windowHeight/2 - 25);

  fill('gray');
  noStroke();
  rect(windowWidth/2, -windowHeight/2 + 100, 120, 80);
  fill('white');
  text('CLICK HERE', windowWidth/2, -windowHeight/2 + 100);

  // print('mouseX: ' + mouseX)
  // print('mouseY: ' + mouseY)
  if (dist(mouseX, mouseY, 0, 681) < 100 || dist(mouseX, mouseY, 5, 300) < 100){
    cursor.active = true;
  } else {
    cursor.active = false;
  }

  let img = vid.get();
  image(img, windowWidth/2, -windowHeight/2 + 400);
  
  // print(mouseX + ', ' + mouseY);

  // ellipse(-windowWidth/2, -windowHeight/2, 50);

  pop();

  cursor.move();
  cursor.draw();

}

function mousePressed(){
  if (playing && dist(mouseX, mouseY, 5, 300) < 100) {
    vid.pause();
    playing = !playing;
  }
  else if (!playing && dist(mouseX, mouseY, 5, 300) < 100){
    vid.loop();
    playing = !playing;
  } 
  

  else if (cursor.active) print();
}