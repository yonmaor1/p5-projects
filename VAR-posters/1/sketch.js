let palette = ["5555ff",/*"f6f1ff",*/ "2f2fde","010142","9393f5","5555ff","5555ff", "c3ace8"];
let subTextColor = "#CCCCFF";
let textColor = "#f9fab9";
textColor = '#dce1fa';
subTextColor = textColor;
let cnv;


function setup() {
  cnv = createCanvas(400, 600);
  cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  // colorMode(HSB, 360, 100, 100, 255);
  strokeWeight(2);
  setObject();
  background(0);

  // frameRate(60);
}

function invertCol(c){
  
  r = 255 - red(c); //get the mathmatical inverse
  g = 255 - green(c); //get the mathmatical inverse
  b = 255 - blue(c); //get the mathmatical inverse
  
  return color(r,g,b); 
}

let minW;
let maxW;

let aryCurveLine = [];

function setObject() {
  minW = min(width, height) * 1;
  maxW = max(width, height);

  //strokeWeight(minW / 800);
  strokeCap(SQUARE);
  noFill();
  
  let numCurveLine = 12;
  aryCurveLine = [];
  for (let i = 0; i < numCurveLine; i++) {
    let posY = (-minW / 2 + minW / numCurveLine * (.2 + i)) * 1;
    aryCurveLine[i] = new CurveLine(posY);
  }
}

class ChildCurveLine {
  constructor(aryXi, stepX, ampY, aryFunctionParameter, col, col2) {
    this.aryXi = aryXi;
    this.stepX = stepX;
    this.ampY = ampY;
    this.aryFunctionParameter = aryFunctionParameter;
    this.numFunction = this.aryFunctionParameter.length;
    this.col = col;
    this.col2 = col2;
    this.numInner = 20;//9;
    this.count = 0;
  }

  draw(yShift) {
    push();

    let aryY = [];
    for (let i = 0; i < this.aryXi.length; i++) {
      let val = 0;
      let xi = this.aryXi[i];
      for (let j = 0; j < this.numFunction; j++) {
        val += sin(this.aryFunctionParameter[j][0] + 2 * PI * this.aryFunctionParameter[j][1] * this.aryFunctionParameter[j][2] * xi + this.aryFunctionParameter[j][3] * this.count)**this.aryFunctionParameter[j][4];
      }
      val /= this.numFunction; // -1 to 1
      aryY[i] = val;
    }

    stroke(this.col);

    for (let j = 0; j < this.numInner - 1; j++) {
      beginShape();
      for (let i = 0; i < this.aryXi.length; i++) {
        let xi = this.aryXi[i];
        let valY = aryY[i] / this.numInner * (j + 1);
        vertex(this.stepX * xi, this.ampY * valY);
      }
      endShape();
    }

    beginShape();
    for (let i = 0; i < this.aryXi.length; i++) {
      let xi = this.aryXi[i];
      let valY = aryY[i];
      vertex(this.stepX * xi, this.ampY * valY);
    }
    vertex(this.stepX * this.aryXi[this.aryXi.length-1], 0);
    vertex(this.stepX * this.aryXi[0], 0);
    endShape(CLOSE);

    stroke(this.col);
    beginShape();
    for (let i = 0; i < this.aryXi.length; i++) {
      let xi = this.stepX * this.aryXi[i];// + width/2;
      let valY = (this.ampY * aryY[i]);
      // vertex(this.stepX * xi, this.ampY * valY);
      // if (invert_xlo < xi && xi < invert_xlo + invert_w &&
      //     invert_ylo < valY && valY < invert_ylo + invert_h){ 
      //     print(valY);
      //     stroke(invertCol(this.col));
      // }
      // else { 
        
      //   stroke(this.col);
      // }
      // line( this.stepX * this.aryXi[i], this.ampY * aryY[i],
      //       this.stepX * this.aryXi[i+1], this.ampY * aryY[i+1])
      vertex(xi, valY);
    }
    vertex(this.stepX * this.aryXi[this.aryXi.length-1], 0);
    vertex(this.stepX * this.aryXi[0], 0);
    endShape(CLOSE);
    // line( this.stepX * this.aryXi[this.aryXi.length-1], 0, 
    //         this.stepX * this.aryXi[0], 0);

    pop();

    this.count++;
  }
}

class CurveLine {
  constructor(posY) {
    this.posY = posY;

    this.stepX = minW / 200 / 1 * random(0.5, 2.5);
    this.xiMin = -(int((width / 2) / this.stepX) + 1);
    this.xiMax = -this.xiMin;

    this.ampY = minW / 1.5 * 1 / 1.25;

    this.numFunction = 4;
    this.aryFunctionParameter = [];
    for (let i = 0; i < this.numFunction; i++) {
      this.aryFunctionParameter[i] = [
        random(2 * PI), //init
        random(0.5, 2), //freq
        random(0.001, 0.005) * random([-1, 1]) * 1, //stepSpeed
        random(0.005, 0.015), //timeSpeed
        int(random([1, 3, 5])) // order of function
      ];
    }

    this.numSeriesXi = 8;//10;
    this.aryChildren = [];

    let aryXi = [];
    let xi = 0;
    aryXi.unshift(xi); // xi=0
    xi--;
    while (xi >= this.xiMin) { // minXi <= xi <= -1
      aryXi.unshift(xi);
      if (xi % this.numSeriesXi == 0) {
        let col = color("#" + random(palette));
        if (this.aryChildren.length > 0) {
          while (red(this.aryChildren[0].col) == red(col) && green(this.aryChildren[0].col) == green(col) && blue(this.aryChildren[0].col) == blue(col)) {
            col = color("#" + random(palette));
          }
        }
        let col2 = color("#" + random(palette));
        while (red(col) == red(col2) && green(col) == green(col2) && blue(col) == blue(col2)) {
          col2 = color("#" + random(palette));
        }
        this.aryChildren.unshift(new ChildCurveLine(aryXi, this.stepX, this.ampY, this.aryFunctionParameter, col, col2));
        aryXi = [];
        aryXi.unshift(xi);
      } else if(xi == this.xiMin) {
        let col = color("#" + random(palette));
        if (this.aryChildren.length > 0) {
          while (red(this.aryChildren[0].col) == red(col) && green(this.aryChildren[0].col) == green(col) && blue(this.aryChildren[0].col) == blue(col)) {
            col = color("#" + random(palette));
          }
        }
        let col2 = color("#" + random(palette));
        while (red(col) == red(col2) && green(col) == green(col2) && blue(col) == blue(col2)) {
          col2 = color("#" + random(palette));
        }
        this.aryChildren.unshift(new ChildCurveLine(aryXi, this.stepX, this.ampY, this.aryFunctionParameter, col, col2));
      }
      xi--;
    }

    aryXi = [];
    xi = 0;
    aryXi.push(xi); // xi=0
    xi++;
    while (xi <= this.xiMax) { // 1 <= xi <= xiMax
      aryXi.push(xi);
      if (xi % this.numSeriesXi == 0) {
        let col = color("#" + random(palette));
        if (this.aryChildren.length > 0) {
          while (red(this.aryChildren[this.aryChildren.length-1].col) == red(col) && green(this.aryChildren[this.aryChildren.length-1].col) == green(col) && blue(this.aryChildren[this.aryChildren.length-1].col) == blue(col)) {
            col = color("#" + random(palette));
          }
        }
        let col2 = color("#" + random(palette));
        while (red(col) == red(col2) && green(col) == green(col2) && blue(col) == blue(col2)) {
          col2 = color("#" + random(palette));
        }
        this.aryChildren.push(new ChildCurveLine(aryXi, this.stepX, this.ampY, this.aryFunctionParameter, col, col2));
        aryXi = [];
        aryXi.push(xi);
      } else if(xi == this.xiMax) {
        let col = color("#" + random(palette));
        if (this.aryChildren.length > 0) {
          while (red(this.aryChildren[this.aryChildren.length-1].col) == red(col) && green(this.aryChildren[this.aryChildren.length-1].col) == green(col) && blue(this.aryChildren[this.aryChildren.length-1].col) == blue(col)) {
            col = color("#" + random(palette));
          }
        }
        let col2 = color("#" + random(palette));
        while (red(col) == red(col2) && green(col) == green(col2) && blue(col) == blue(col2)) {
          col2 = color("#" + random(palette));
        }
        this.aryChildren.push(new ChildCurveLine(aryXi, this.stepX, this.ampY, this.aryFunctionParameter, col, col2));
      }
      xi++;
    }
  }

  draw() {
    push();
    translate(0, this.posY);
    for (let i = 0; i < this.aryChildren.length; i++) {
      this.aryChildren[i].draw(this.posY);
    }
    pop();
  }
}

let impact;
function preload() {
  impact = loadFont('impact.ttf');
}

let invert_xlo = 20;
let invert_ylo = 320;
let invert_w = 300;
let invert_h = 44*3.5;

function drawTextMono(){
  invert_ylo = 310
  
  push();
  translate(-width/2, -height/2);

  textSize(44);
  textAlign(LEFT, TOP);
  textFont('monospace');

  text("MAKING ", 10, height / 2); 
  drawingContext.filter = 'blur(4px)';
  text("ART", 10 + width/2 - 20, height / 2);
  drawingContext.filter = 'blur(0px)';
  
  textSize(14);
  text("in the ", 10 + width/2 + 55, height / 2 + 22);

  textSize(44);
  text("END OF THE ", 10, height / 2 + 44);
  text("WORLD", 10, height / 2 + 2 * 44);
  
  pop();
  noFill();
}

function drawTextImpact(){
  push();
  translate(-width/2, -height/2);

  textSize(44);
  textAlign(LEFT, TOP);
  textFont(impact);

  text("MAKING ", 10, height / 2); 
  drawingContext.filter = 'blur(3px)';
  text("ART", 10 + width/2 - 45, height / 2);
  drawingContext.filter = 'blur(0px)';
  
  textSize(14);
  text("in the ", 10 + width/2 + 25, height / 2 + 30);

  textSize(44);
  text("END OF THE ", 10, height / 2 + 44);
  text("WORLD", 10, height / 2 + 2 * 44);
  
  pop();
  noFill();
}

function drawSubText(){
  push();
  translate(-width/2, -height/2);
  textAlign(RIGHT, BOTTOM);
  textSize(12);
  textFont('monospace');

  text("Nov. 28 - Dec. 5", width - 10, height - 50);
  text("Ellis Gallery, CFA 3rd Floor", width - 10, height - 30);
  text("Reception Monday Dec. 5, 1pm - 3pm", width - 10, height - 10);
  // noFill();

  pop();
}

function draw() {
  push();

  translate(width/2, height/2);
  background(0);

  noFill();
  for (let i = 0; i < aryCurveLine.length; i++) {
    aryCurveLine[i].draw();
  }

  //drawingContext.filter = 'invert(100%)';
  pop();
  noStroke();
  fill(200, 200, 220, 200);
  rect(invert_xlo, invert_ylo, invert_w, invert_h);
  //drawingContext.filter = 'invert(0%)';

  push();
  translate(width/2, height/2);
  fill(textColor);
  drawTextImpact();
  fill(subTextColor);
  drawSubText();
  pop();

  // noLoop();
}