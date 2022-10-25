var lines = [];
var sortedLines = [];
var shuffledLines = [];
var numLines = 45;
var spacing = 4;

function setup() {
  createCanvas(600, 200);
  noLoop();
  for (var i = 0; i < numLines / 3; i++){
    lines.push('#b53531');
    sortedLines.push('#b53531');
  } for (var i = 0; i < numLines / 3; i++){
    lines.push('#50781f');
    sortedLines.push('#50781f');
  } for (var i = 0; i < numLines / 3; i++){
    lines.push('#1f2b78');
    sortedLines.push('#1f2b78');
  }
  shuffledLines = reshuffle(lines);
}

function draw() {
  background('gray');
  drawNoise(10, height / 3, width - 10, height / 2);
}

function drawNoise(x0, y0, x1, y1) {
  var noiseParam = 0;
  var noiseStep = 0.1;
  var noiseX = x0;
  var step = (x1 - x0) * noiseStep;
  var firstNoise = height * noise(0);
  var lastNoise = height * noise(noiseStep * 99);

  for (var i = 0; i < 100; i++) {
    currNoise = (abs(height * noise(noiseParam) - firstNoise) * ((y1 - y0) / lastNoise));
    nextNoise = (abs(height * noise(noiseParam + noiseStep) - firstNoise) * ((y1 - y0) / lastNoise));
    line( noiseX, currNoise, 
          noiseX + step, nextNoise);
    noiseParam += noiseStep;
    noiseX += step;
  }
}

function draw_() {
  redsDrawn = 0;
  greensDrawn = 0;
  bluesDrawn = 0;

  strokeWeight(2);

  push();
  translate(width/2 - lines.length, 50);
  // ellipse(0, 0, 2);
  for (var i = 0; i < lines.length; i++){
    currentColor = shuffledLines[i];
    stroke(currentColor);

    line(spacing*i, 0, spacing*i, 100);

    push()
    translate(0, 100);
    if (currentColor == '#b53531'){ 
      vals = scaleNoise(i*spacing, redsDrawn*spacing, lines.length*spacing);
      drawNoiseBounds(vals, 200);
      redsDrawn++; 
    }
    if (currentColor == '#50781f'){ 
      vals = scaleNoise(i*spacing, greensDrawn*spacing, lines.length*spacing);
      drawNoiseBounds(vals, 200);
      greensDrawn++; 
    }
    if (currentColor == '#1f2b78'){ 
      vals = scaleNoise(i*spacing, bluesDrawn*spacing, lines.length*spacing);
      drawNoiseBounds(vals, 200);
      bluesDrawn++; 
    }
    pop();

  }

  translate(0, 299);
  for (var i = 0; i < lines.length; i++){
    stroke(sortedLines[i]);
    line(spacing*i, 0, spacing*i, 100);
  }
  pop();
}

function reshuffle(array) {
  // knuth shuffle
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function scaleNoise(start, end, scale) {
  vals = []
  noiseSeed(int(random(1000)));
  param = 20;

  for (var i = 0; i < 100; i++){
    vals.push(scale*noise(i / param));
  }

  startVal = noise(0);
  endVal = noise(99 / param);

  scale = (end - startVal) / endVal
  shift = startVal - start;

  for (var i = 0; i < 100; i++){
    vals[i] = (vals[i] - startVal) * (end / (endVal - startVal)) + start;
  }

  return vals;

}

function noiseBounds(start, end, scale, seed) {
  var vals = [];
  noiseSeed(seed);
  param = 0;
  step = 0.1;
  startValue = scale * noise(param);


  while (int(startValue) != int(start)){
    param += step
    startValue = scale * noise(param);
  }

  vals.push(startValue);
  startParam = param;

  endValue = scale * noise(param);
  while (int(endValue) != int(end)){
    param += step
    endValue = scale * noise(param);
    vals.push(endValue)
  }

  endParam = param;

  return vals;
}

function drawNoiseBounds(vals, len) {
  step = int(len / vals.length);
  for (var i = 0; i < vals.length - 1; i++){
    line(vals[i], i * step, vals[i+1], (i+1) * step);
  }
}