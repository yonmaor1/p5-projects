function get_row(i, n, m){
  return i % n;
}

function get_col(i, n, m){
  return int(i / m);
}

function get_index(x, y, n, m){
  return y * n + x;
}

function get_pixel(x, y){
  let d = pixelDensity();
  for (let i = 0; i < d; i++) {
    for (let j = 0; j < d; j++) {
      index = 4 * ((y * d + j) * width * d + (x * d + i));
      r = pixels[index];
      g = pixels[index+1];
      b = pixels[index+2];
      a = pixels[index+3];
    }
  }

  return color(r, g, b, a);
}

function update_pixels(line){
  loadPixels();
  let d = pixelDensity();
  let n = 4 * width * d;
  let m = height * d;

  for (i = 0; i < width; i+=4){ 
    for (j = 0; j < line.arr[i]; j++){
      let x = int(i/4);
      let y = j;
      // if ()
      target_pixel = get_pixel(x + cos(line.angle), y + sin(line.angle));
      pixels[width * j + i] = red(target_pixel);
      pixels[width * j + i + 1] = green(target_pixel);
      pixels[width * j + i + 2] = blue(target_pixel);
      pixels[width * j + i + 3] = alpha(target_pixel);
    }
  }



  updatePixels();
}

// // line class
// function make_random_line(){
//   let arr = [];
//   let scale = 10;
//   noiseSeed(random(1000));
//   for (i = -width; i < width; i++){
//     arr.push(scale * noise(i/10))
//   }

//   let l = {
//     arr: arr,
//     angle: degrees(random(360)),
//     draw: draw_random_line,
//     deposit: deposit_line_to_points
//   }

//   return l;
// }

function make_random_line(){
  noiseSeed(random(1000));

  let arr = [];
  let scale = 10;
  let angle = random(0, 2*PI);
  let slope = tan(angle);

  let line_height = width * slope;
  y_offset = height / 2 - line_height + line_height / 2;

  for (let i = 0; i < width; i ++){
    arr.push(scale * noise(i/10) + i * slope + y_offset);
  }

  let l = {
    arr: arr,
    slope: slope,
    angle: angle,
    draw: draw_random_line
  }

  return l;
}

function draw_random_line(){
  stroke('black');
  push();
  for (i = 0; i < this.arr.length - 1; i++){
    line(i, this.arr[i], i + 1, this.arr[i + 1]);
  }
  pop();
}

function draw_incremented_array(arr, step){
  stroke('black');
  for (i = 0; i < arr.length - 1; i++){
    line(-width + i, arr[i] + step, -width + i + 1, arr[i + 1] + step);
  }
}

let lines = []; // 2D array of lines returned by make_random_line

function setup() {
  pixelDensity(1)
  createCanvas(400, 400);
  l = make_random_line();
}

let l;
let hold = 0;

function draw() {
  background('white');

  // translate(width/2, height/2)
  if (hold == 0){
    l = make_random_line();
    push();
      translate(sin(l.angle), cos(l.angle));
      l.draw();
    pop();
    push();
      translate(-sin(l.angle), -cos(l.angle));
      l.draw();
    pop();

    hold++;
  } else if (hold < 20) {
    update_pixels(l);
    hold++;
  } else {
    hold = 0;
  }

  // noLoop();
}

function mousePressed(){
  noLoop();
}