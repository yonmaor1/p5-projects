let shapes = [];
let shapesNum = 10;
let pg;
const delta = 5000;

let noiseX;
let noiseY;
let MAX = 50;
let noiseParam = 0;
let noiseStep = 0.1;

let col;
let target_col;

let curve = []

function setup() {
  createCanvas(1080, 1920);
  angleMode(DEGREES);
  frameRate(60);
  strokeWeight(1);

  noiseX = random(1000);
  noiseY = random(1000);

  noFill()
  stroke('white')
  init_cross_section(0);

  background(0);

  // noLoop();
}

function draw() {

  
  background(0);
  col = color(0, 0, 255 * noise(noiseParam));

  create_cross_section(noiseParam);
  intersections = find_intersections()

  /* 

  for (let i = 0; i < intersections.length; i++) {
    let [startx, starty, endx, endy] = intersections[i];

    print([startx, starty, endx, endy])

    let j = curve.indexOf([startx, starty]);
    // print(j)
    fill(0, 0, 100, 100)
    beginShape()
    while (j < curve.length && curve[j] != undefined && curve[j] != [endx, endy]){
      vertex(curve[j][0], curve[j][1]);
      j++;
    }
    endShape()

  }

  */

  noiseParam += noiseStep;

}

function make_vertex(x, y){
  let v = {
    x: x,
    y: y, 
    draw: draw_vertex,
    move: move_vertex,
  }

  return v;
}

function draw_vertex(){
  vertex(this.x, this.y);
}

function move_vertex(move_fn, k, p){

  this.x = map(noise(noiseX, k * 0.005, p * 0.011), 0, 1, -width, width * 2);
  this.y = map(noise(noiseY, k * 0.005, p * 0.0113), 0, 1, -height, height * 2);
  
  // this.x = move_fn(k, p, 'x');
  // this.y = move_fn(k, p*0.02 + 0.003, 'y');
}

function noise_move(k, p, axis){
  limit = axis == 'x' ? width : height;
  noise_axis = axis == 'x' ? noiseX : noiseY;
  
  return map(noise(noise_axis, k * 0.005, p * 0.011), 0, 1, -limit * 0.75, limit * 1.75)
}

function sign(x){
  return x > 0 ? 1 : -1;
}

function xor(a, b){
  return ( a || b ) && !( a && b );
}

function init_cross_section(noiseZ){

  for (let k = 0; k < 1000; k++) {
      let p = noiseZ;

      let x0 = noise_move(k, p, 'x')
      let y0 = noise_move(k, p, 'y')
      
      curve.push(make_vertex(x0, y0))
  }

}

function create_cross_section(noiseZ){

  stroke('white')
  beginShape();
  for (let k = 0; k < curve.length; k++) {
      let p = noiseZ;
      curve[k].move(noise_move, k, p)    
  }

  print(curve.length)
  endShape();
  
}

function find_intersections(){

  let intersections = [];

  for (let i = 0; i < curve.length-1; i++) {
    let v0 = curve[i];
    let v1 = curve[i+1];

    let [x01, y01] = [v0.x, v0.y];
    let [x02, y02] = [v1.x, v1.y];

    stroke('white')
    fill('white')
    ellipse(x01, y01, 2, 2);
    noFill();

    for (let j = i + 2; j < curve.length-1; j++) {
      let v2 = curve[j];
      let v3 = curve[j+1];

      let [x11, y11] = [v2.x, v2.y];
      let [x12, y12] = [v3.x, v3.y];

      dx_initial = x01 - x11;
      dy_initial = y01 - y11;
      
      dx_final = x02 - x12;
      dy_final = y02 - y12;
      
      if (sign(dx_initial) != sign(dx_final) && sign(dy_initial) != sign(dy_final)){
        stroke('red')
        strokeWeight(2)
        ellipse(x01, y01, 20, 20);
        strokeWeight(1)
        intersections.push(v0);
        intersections.push(v2);
      }
    }
  }
  // print(intersections);
  return intersections;
}

function find_all_closed_shapes(){
  let closed_shapes = [];
  let intersections = find_intersections();

  for (let i = 0; i < intersections.length; i++) {
    let v0 = intersections[i];
    let v1 = intersections[i+1];

    let [x0, y0] = [v0.x, v0.y];
    let [x1, y1] = [v1.x, v1.y];

    if (x0 == x1 && y0 == y1){
      closed_shapes.push(v0);
    }
  }

  return closed_shapes;
}