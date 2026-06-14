let planes = [];
let n_planes = 7;
let n_divs = 10;
let plane_width = 100;
let object_height_coeff = 0.6;
let object_height;

let curve_stregth;

let bg_x = 100;
let bg_y = -200;

function toAlpha(num) {
  let alpha_str = ""
  for (let i = 0; i < floor(num/26); i++) {
    alpha_str += 'Z'
  }
  alpha_str += String.fromCharCode(65 + num%26)
  return alpha_str
};

function setup() {
  createCanvas(800, 800, WEBGL)
  frameRate(24)
  // debugMode();
  // noLoop()
  angleMode(DEGREES)

  noFill()
  strokeWeight(0.5)
  
  object_height = height * object_height_coeff
  curve_stregth = object_height / (3*n_planes)
  for (let i = 0; i < n_planes; i++){
    // original
    y = map(i, 0, n_planes, -object_height/2, object_height/2)
    is_fixed = i == 0 || i == n_planes - 1 ? true : false
    planes[i] = createPlane(0, y, 0, 90, 0, 0, is_fixed)
    
    // circle
    // theta = map(i, 0, n_planes, 0, 360)
    // r = object_height / 2
    // is_fixed = i == 0 || i == n_planes - 1 ? true : false
    // planes[i] = createPlane(
    //   r*cos(theta), r*sin(theta), 0, 
    //   90, theta, 0,
    //   is_fixed)
  }
}

function draw() {
  background('white')
  // orbitControl();
  
  push()
  rotateY(30)
  for (let i = 0; i < planes.length; i++){
    // debug
    // push()
    // stroke(0, 100)
    // translate(planes[i].init_x + planes[i].x, planes[i].init_y + planes[i].y, 0)
    // plane()
    // pop()
    
    planes[i].move()
    planes[i].draw()
    // planes[i]._drawAbsoluteSubdivs()
  }
  pop()

  resetMatrix();
  // lightsource_bg()
  push()
  stroke(0, 255)
  translate(-width/2, -object_height + object_height/n_planes + 12)
  // translate(-(object_height*0.3125), -(object_height*0.125))
  // circle(0, 0, object_height*0.625)
  for (let p = 0; p < planes.length; p++){
    let curr_plane = planes[p]
    for (let i = 0; i < curr_plane.points.length; i++) {
      let curr_row = curr_plane.points[i]
      stroke(0, 100)
      line(
        curr_row[0].x, curr_row[0].y,
        curr_row[(curr_row.length)-1].x, curr_row[(curr_row.length)-1].y,
      )
      line(
        curr_plane.points[0][i].x, curr_plane.points[0][i].y,
        curr_plane.points[(curr_row.length)-1][i].x, curr_plane.points[(curr_row.length)-1][i].y,
      )
      
      if (p < n_planes-1){
        var next_plane = p < n_planes-1 ? planes[p+1] : planes[0]
        let next_row = next_plane.points[i]
  
        let curr_control = curr_plane.controls_pre[i]
        let next_control = next_plane.controls_post[i]
        stroke(0, 255)
        for (let j = 0; j < curr_row.length; j++) {
          bezier(
            curr_row[j].x, curr_row[j].y,
            curr_control[j].x, curr_control[j].y,
            next_control[j].x, next_control[j].y,
            next_row[j].x, next_row[j].y
          )
  
          // line(
          //   curr_row[j].x, curr_row[j].y,
          //   curr_control[j].x, curr_control[j].y
          // )
          // line(
          //   next_control[j].x, next_control[j].y,
          //   next_row[j].x, next_row[j].y
          // )
      }
      }
    }
  }
  pop()
  // if (frameCount < 60 * 24){
  //   print("Saving frame " + toAlpha(frameCount))
  //   saveCanvas(toAlpha(frameCount), 'png')
  // } else {
  //   noLoop()
  // }
}

function mousePressed() {
  bg_x = mouseX
  bg_y = mouseY

  print(bg_x + ", " + bg_y)
}

function keyPressed() {
  if (key === 's'){
    saveGif('johnpai.gif', 6)
    // saveFrames(frameCount, 'png', 15, 22)
  }
}

function lightsource_bg() {
  push()
  for (let i = 0; i < width; i++) {
    a = map(i, 0, width, 255, 0);
    stroke(255, 250, 150, a)
    ellipse(bg_x, bg_y, i, i)
  }
  pop()
}

/**  */

function createPlane(x, y, z, init_angle_x, init_angle_y, init_angle_z, fixed) {
  p = {
    init_x: x, init_y: y, init_z: z,
    x: 0, y: 0, z: 0,
    angle_x: 0, angle_y: 0, angle_z: 0,
    init_angle_x: init_angle_x, init_angle_y: init_angle_y, init_angle_z: init_angle_z,
    fixed: fixed, noise_param: random(10000),
    points: [], controls_pre: [], controls_post: [],
    draw: drawPlane,
    move: movePlane,
    _drawAbsoluteSubdivs: _drawAbsoluteSubdivs
  }
  return p
}

function drawPlane() {
  stroke('red')
  // plane(plane_width, plane_width)
  push()
  translate(this.init_x + this.x, this.init_y + this.y, this.init_z + this.z)
  rotateX(this.init_angle_x + this.angle_x)
  rotateY(this.init_angle_y + this.angle_y)
  rotateZ(this.init_angle_z + this.angle_z)
  for (let i = 0; i < n_divs+1; i ++) {
    this.points[i] = []
    this.controls_pre[i] = []
    this.controls_post[i] = []
    x = map(i, 0, n_divs, -plane_width/2, plane_width/2)
    for (let j = 0; j < n_divs+1; j ++) {
      y = map(j, 0, n_divs, -plane_width/2, plane_width/2)

      if (i < n_divs && j < n_divs){
        // rect(x, y, plane_width/n_divs, plane_width/n_divs)
      }
      this.points[i][j] = worldToScreen(x, y, 0);
      this.controls_pre[i][j] = worldToScreen(x, y, -curve_stregth)
      this.controls_post[i][j] = worldToScreen(x, y, curve_stregth)
    }
  }
  pop()
}

angle_range = 60
move_range = plane_width / 2
function movePlane() {
  if (this.fixed){
    return
  }

  this.angle_x = angle_range*(noise(this.noise_param) - 0.5)
  this.angle_y = angle_range*(noise(this.noise_param + 100) - 0.5)
  this.angle_z = angle_range*(noise(this.noise_param + 200) - 0.5)
  
  this.x = move_range*(noise(this.noise_param + 300) - 0.5)
  this.z = move_range*(noise(this.noise_param + 400) - 0.5)
  this.noise_param += 0.005
}

function _drawAbsoluteSubdivs() {
  push()
  stroke('red')
  for (let i = 0; i < this.points.length; i++) {
    row = this.points[i]
    for (let j = 0; j < row.length; j++) {
      point(row[j].x, row[j].y)
    }
  }
  pop()
}