let slider;

let img;
let WIDTH;
let HEIGHT;

let step_size = 2

function preload() {
  img = loadImage("./assets/poster.png");
  WIDTH = 612 // img.width;
  HEIGHT = 792 // img.height;
}

function setup() {
  const cnv = createCanvas(WIDTH, HEIGHT);
  cnv.parent("canvas-holder");
  slider = document.getElementById("slider");
  noStroke()

  noLoop()
}

const avg = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;

function get_avg_value_in_circle(x, y, r) {
  let rs = [], gs = [], bs = [], as = [];

  
  for (let i = max(Math.ceil(x - r), 0); i <= min((Math.floor(x + r), width)); i++) {
    for (let j = max(Math.ceil(y - r), 0); j <= min(Math.floor(y + r), height); j++) {
      let distSq = (i - x) ** 2 + (j - y) ** 2;
      
      if (distSq < r ** 2) {
        pixel_color = img.get(i, j);
        rs.push(pixel_color[0]);
        gs.push(pixel_color[1]);
        bs.push(pixel_color[2]);
        as.push(pixel_color[3]);
      }
    }
  }
  
  return [avg(rs), avg(gs), avg(bs), avg(as)]
}

noise_step = 0.005
ortho_noise_param = 0.01

function draw() {
  image(img, 0, 0, width, height);

  const blurr_max = 75 // Number(slider.value)

  for (let i = 0; i < width; i+=step_size) {
    for (let j = 0; j < height; j+=step_size) {
      blurr_factor = floor(blurr_max * max((noise(i * noise_step + frameCount * 0.01, j * noise_step + noise(frameCount * 0.01) - 0.4, frameCount * 0.01) - 0.5), 0));
      if (blurr_factor > 0) {
        // print(blurr_factor)
        avg_color = get_avg_value_in_circle(i, j, blurr_factor);
        // colors = pts.map(pt => img.get(pt.i, pt.j));
        // avg_color = colors.reduce((acc, c) => {
        //   return [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2], acc[3] + c[3]];
        // }, [0, 0, 0, 0]).map(c => c / colors.length);
        // color_value = avg_color;
        fill(avg_color[0], avg_color[1], avg_color[2], avg_color[3]);
        rect(i, j, step_size, step_size);
      }

    }
  }

  // print(frameRate())
}
