var base_rand = 2;
var base_height = 20;
var pillar_width = 25;

var og_length = 300;
var string_length = 20;
var res = 10;
var string_step = 0.2;
var decreasing = true;


function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
}
 
function draw() {
    background('black');
    stroke('white');
    noFill();
    strokeWeight(3);
    
    drawSeeSaw();
    drawPillar();
    title();

    if (og_length - string_length <= 20 || og_length - string_length >= 280) {
        decreasing = !decreasing;
    }

    if (decreasing){
        string_length -= string_step;
    } else {
        string_length += string_step;
    }
}

function noisyCircle(x, y){
    push();
    translate(x, y);


    for (var r = 5; r < 20; r+=5){
        var start_rand = random(-base_rand, base_rand);
        var end_rand;
        for (var theta = 0; theta < 360; theta += 5){
            end_rand = random(-base_rand, base_rand);
            strokeWeight(1);
            line(   (r + end_rand) * cos(theta) + start_rand, (r + start_rand) * sin(theta) + start_rand, 
                    (r + start_rand) * cos(theta + 5) + end_rand, (r + end_rand) * sin(theta + r) + end_rand);
            start_rand = end_rand;
        }
    }


    pop();
}

function title(){
    var txt1 = "FEED ME";
    var txt2 = "FEED YOU";

    textSize(30);
    noFill();
    stroke('white');
    text(txt1, 20 + random(-base_rand/2, base_rand/2), (height / 2) - 15 + random(-base_rand/2, base_rand/2));
    text(txt2, 20 + random(-base_rand/2, base_rand/2), (height / 2) + 15 + random(-base_rand/2, base_rand/2));
}

function drawSeeSaw(){
    var start_rand = random(-base_rand, base_rand);
    var end_rand;
    var len = 200;
    var step = len / res;
    var x = (width - len) / 2;
    var y = 30;
    for (var i = 0; i < res; i++){
        end_rand = random(-base_rand, base_rand);
        line(x, y + start_rand, x + step, y + end_rand)
        x += step;
        start_rand = end_rand;
    }

    // string
    var len_left = string_length;
    var step = len_left / res;
    var x = (width - len) / 2;
    var y = 30;
    //left
    for (var i = 0; i < res; i++){
        end_rand = random(-base_rand, base_rand);
        line(x + start_rand, y, x + end_rand, y + step)
        y += step;
        start_rand = end_rand;
    }
    noisyCircle((width - len) / 2, y)
    noisyCircle((width - len) / 2, y + 10)

    //right
    var len_right = og_length - string_length;
    var step = len_right / res;
    var x = (width + len) / 2;
    var y = 30;
    for (var i = 0; i < res; i++){
        end_rand = random(-base_rand, base_rand);
        line(x + start_rand, y, x + end_rand, y + step)
        y += step;
        start_rand = end_rand;
    }
    noisyCircle((width + len) / 2, y)
}

function drawPillar(){
    push();
    scale(1, 0.9);
    push();
    rotate(180);
    translate(-width, -height - 25);

    var x1 = random(-base_rand, base_rand);
    var y1 = random(-base_rand, base_rand);
    var x2 = random(-base_rand, base_rand);
    var y2 = random(-base_rand, base_rand);
    var x3 = random(-base_rand, base_rand);
    var y3 = random(-base_rand, base_rand);
    var x4 = random(-base_rand, base_rand);
    var y4 = random(-base_rand, base_rand);
    var x5 = random(-base_rand, base_rand);
    var y5 = random(-base_rand, base_rand);
    var x6 = random(-base_rand, base_rand);
    var y6 = random(-base_rand, base_rand);

    // base
    line(   width/2 - pillar_width + x1, height - 10 + y1, 
            width/2 + pillar_width + x2, height - 10 + y2);
    line(   width/2 - pillar_width + x1, height - 10 + y1, 
            width/2 - pillar_width + x3, height - base_height + y3);
    line(   width/2 - pillar_width + x3, height - base_height + y3, 
            width/2 - pillar_width + pillar_width / 2 + x6, height - base_height - pillar_width / 2 + x6);

    line(   width/2 + pillar_width + x2, height - 10 + y2, 
            width/2 + pillar_width + x4, height - base_height + y4);
    line(   width/2 + pillar_width + x4, height - base_height + y4, 
            width/2 + pillar_width - pillar_width / 2 + x5, height - base_height - pillar_width / 2 + y5);

    line(   width/2 - pillar_width + pillar_width / 2 + x6, height - base_height - pillar_width / 2 + y6, 
            width/2 + pillar_width - pillar_width / 2 + x5, height - base_height - pillar_width / 2 + y5);

    // pillar
    line(   width/2 - pillar_width + pillar_width / 2 + x6, height - base_height - pillar_width / 2 + y6, 
            width/2 - pillar_width + pillar_width / 2 + x1, pillar_width + y1);
    line(   width/2 + pillar_width - pillar_width / 2 + x5, height - base_height - pillar_width / 2 + y5, 
            width/2 + pillar_width - pillar_width / 2 + x2, pillar_width + y2);

    line(   width/2 - pillar_width + pillar_width / 2 + x1, pillar_width + y1, 
            width/2 + pillar_width - pillar_width / 2 + x2, pillar_width + y2);
    pop();

    pop();
}

function generateCurve(){
    var noiseParam = 0;
    while (curveIndex < nPoints * displayRatio){
        param1 = noise(noiseParam) * 10;
        param2 = noise(noiseParam + 1000) * 20;
        noiseParam += noiseStep;
        ph += rotation;
        var t = map(curveIndex, 0, nPoints, 0, TWO_PI);


        x = (param1 / n) * (a - b) * cos(t) + (param2 / n) * h * cos(ph + (t * (a - b)) / b);
        y = (param1 / n) * (a - b) * sin(t) - (param2 / n) * h * sin(ph + (t * (a + b)) / b);
        allX.push(x);
        allY.push(y);
        curveIndex++;
    }
    noiseSeed(random(1000));
}
  