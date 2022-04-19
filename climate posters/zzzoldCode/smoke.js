var smoke = [];

var dx = 5;
var dy = 7;

var impact;

function preload() {
    impact = loadFont('fonts/impact.ttf');
}

function setup() {
    createCanvas(400,600);
    background(220);
}

function draw() {
    background(220);

    writeText();

    updateAndDisplaySmoke();
    removeSmoke();
    for (var i = 2; i < 5; i++) {
        h = map(exp(i), 0, exp(4), 0, height*0.8);
        newSmoke(15+75*i, height - h);
    }

    drawBars();
}

function drawBars() {
    fill('black');
    var w = 60;
    var h;
    for (var i = 0; i < 5; i++) {
        h = map(exp(i), 0, exp(4), 0, height*0.8);
        rect(15+75*i, height - h, w, h);
    }

}

function writeText() {
    push();
    //translate(0, 0.3*height);
    textSize(64);
    fill(138, 76, 76);
    textFont(impact);
    text('MAKE', 10, 60);
    text('POLLUTERS', 10, 120);
    text('PAY!', 10, 180);

    //textSize(30);
    //text('CARBON DIVIDEND NOW', 10, 240)
    pop();
}

function makeSmoke(birthX, birthY) {
    var smoke = {x: birthX,
                y: birthY,
                r: 5,
                t: random(0, 50),
                speedX: random(1,3),
                speedY: random(3,5),
                move: smokeMove,
                display: smokeDisplay}
    return smoke;
}

function smokeDisplay() {
    push();
    translate(this.x, this.y);
    noStroke();
    fill(160, 160, 160, this.t);
    ellipse(0, 0, this.r);
    pop();
}

function smokeMove() {
    this.x -= this.speedX;
    this.y -= this.speedY;
    this.r += random(this.speedX, this.speedY);
}

function newSmoke(colX, colY) {
    var prob = 0.25;
    if (random(0,1) < prob) {
        smoke.push(makeSmoke(random(colX, colX+60), colY+10));
    }
}

function removeSmoke(){
    var smokeToKeep = [];
    for (var i = 0; i < smoke.length; i++){
        if (smoke[i].x > -100) {
            smokeToKeep.push(smoke[i]);
        }
    }
    smoke = smokeToKeep;
}

function updateAndDisplaySmoke(){
    for (var i = 0; i < smoke.length; i++){
        smoke[i].move();
        smoke[i].display();
    }
}
