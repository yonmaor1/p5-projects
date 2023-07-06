function make_random_line(){
  let arr = [];
  let scale = 10;
  noiseSeed(random(1000));
  for (i = -width; i < width; i++){
    arr.push(scale * noise(i/10))
  }

  return arr;
}

function draw_random_line(arr){
  stroke('black');
  for (i = 0; i < arr.length - 1; i++){
    line(-width + i, arr[i], -width + i + 1, arr[i + 1]);
  }
}

function draw_incremented_array(arr, step){
  stroke('black');
  for (i = 0; i < arr.length - 1; i++){
    line(-width + i, arr[i] + step, -width + i + 1, arr[i + 1] + step);
  }
}

let lines = []; // 2D array of lines returned by make_random_line

function setup() {
  createCanvas(400, 400);
}

let arr;
let curr_angle;
let hold = 0;

function draw() {
  background(220);

  translate(width/2, height/2)
  rotate(curr_angle);
  if (hold == 0){
    arr = make_random_line();
    curr_angle = degrees(random(360));
    draw_random_line(arr);

    hold++;
  } else if (hold < 20) {

    push();
      translate(0, hold);
      draw_random_line(arr);
    pop();
    push();
      translate(0, -hold);
      draw_random_line(arr);
    pop();

    hold++;
  } else {
    hold = 0
  }

  noLoop();
}
