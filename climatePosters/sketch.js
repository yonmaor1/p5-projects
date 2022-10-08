let cnv;

var numPosters = 3;
var poster = 0;

var posterWidth = 400;
var posterHeight = 600;
var margin = 20;

//smoke vars
var smoke = [];

var dx = 5;
var dy = 7;

var impact;

//fire vars
    //data variables
var fires;
var numRows;

var bgx = []; //background coordinates
var bgy = [];

    //rectangle in center
var margin;
var rectX;
var rectY;

    //canvas
var marginT;
var marginS;

    //colors
var tanColor;
var textRed;

//capitalism vars
var triangleRand;

var barcode
var barcodeWidth = 100;

function preload() {
    dosis = loadFont('fonts/Dosis-ExtraBold.ttf');
    dosisL = loadFont('fonts/Dosis-Light.ttf');
    gothic = loadFont('fonts/LetterGothicStd.otf');
    akkordeon = loadFont('fonts/Akkordeon.otf');
    impact = loadFont('fonts/impact.ttf');

    fires = loadTable("data/2021cafires2.csv", "header");

    barcode = loadImage('img/barcode.png');
}

function setup() {
    //smoke
    cnv = createCanvas(posterWidth*3 + margin*2,posterHeight);
    background(220);

    //fires
    noStroke();
    numRows = fires.getRowCount();
    background('black');
    //frameRate(16);

    marginS = 15;
    marginT = 1.5*marginS;
    rectX = width-2*marginS;
    rectY = 500;

    tanColor = color(230, 226, 220);
    textRed = color(255,50,0);

    //storeBackground();
}

function draw() {
    cnv.parent('poster');

    switch (poster) {
        case 0:
            push();
            smokePoster();
            pop();
            break;
        case 1:
            push();
            capitalismPoster();
            pop();
            break;
        case 2:
            push();
            cafiresPoster();
            pop();
            break;
    }

}

function mousePressed() {
    poster += 1;
    if (poster == numPosters) {
        poster = 0;
    }
}

//smoke functions untill line 112
function drawBars() {
    fill('black');
    var w = 60;
    var h;
    for (var i = 0; i < 5; i++) {
        h = map(exp(i), 0, exp(4), 0, height*0.8);
        rect(22+75*i, height - h, w, h);
    }
}

function writeText() {
    var textRed = color(138, 76, 76);
    var textGreen = color(128, 194, 129);

    push();
    //translate(0, 0.3*height);
    textSize(64);
    fill(textRed);
    textFont(impact);
    text('CORPORATIONS', 10, 60);
    text('WARM OUR', 10, 120);  fill(textGreen); text('WE ARE', 300, 120);      fill(textRed);
    text('PLANET!', 10, 180);   fill(textGreen); text('ARE PURSUING', 220, 180);fill(textRed);
    text('MAKE', 10, 240);      fill(textGreen); text('ACTIVELY', 170, 240);    fill(textRed);
    text('POLLUTERS', 10, 300); fill(textGreen); text('WORKING', 300, 300);     fill(textRed);
    text('PAY!', 10, 360);      fill(textGreen); text('TO REDUCE', 140, 360);
    text('OUR CARBON FOOTPRINT', 10, 420);
    text('FOOTPRINT BY EXPLORING', 10, 480);
    text('EXPLORING FREE', 10, 540);
    text('MARKET SOLUTIONS', 10, 600);

    //textSize(30);
    //text('CARBON DIVIDEND NOW', 10, 240)
    pop();
}

function makeSmoke(birthX, birthY) {
    var smoke = {x: birthX,
                y: birthY,
                r: 5,
                t: random(0, 70),
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
    fill(100, 100, 100, this.t);
    ellipse(0, 0, this.r);
    pop();
}

function smokeMove() {
    this.x -= this.speedX;
    this.y -= this.speedY;
    this.r += random(this.speedX, this.speedY)-1;
}

function newSmoke(colX, colY) {
    var prob = 0.3;
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

function smokePoster() {
    background(220);

    writeText();

    updateAndDisplaySmoke();
    removeSmoke();
    for (var i = 2; i < 5; i++) {
        h = map(exp(i), 0, exp(4), 0, height*0.8);
        newSmoke(25+75*i, height - h);
    }

    drawBars();

}

//CA fires functions
function drawCircles(lat, long, size) {
    for (var j = 0; j < 2; j++) {
        fill(255, random(0, 140), 0);
        ellipse(lat + random(-3, 3),
                long - random(0, 7),
                random(0, 12));
    }
    //filter(BLUR,5);
    //fill('red');
    //ellipse(lat, long, size);
}

function topText() {
    textFont('dosis');
    textSize(10);
    fill(255,50,0);

    textAlign(LEFT, CENTER);    text('2020', marginS, marginT/2);
    textAlign(CENTER, CENTER);  text('CALIFORNIA WILDFIRES', width/2, marginT/2)
    textAlign(RIGHT, CENTER);   text('WFIGS', width-marginS, marginT/2);
}

function mainText() {
    textSize(60);
    textFont('akkordeon');
    textStyle(NORMAL);
    fill(tanColor);
    textAlign(LEFT, BOTTOM);

    push();

    translate(marginS, marginT+rectY);

    var offset = 0;

    text("WHOSE", 10, -3*45);
    text("LAND", 10, -2*45);
    text("ARE WE", 10, -45);
    text("BURNING?", 10, 0);

    pop();
}

//not used
function movingText() {
    push();
    //rotate(radians(90));

    textSize(30);
    textFont('impact');
    fill('red');
    text("thoughts and prayers", xText1, 40);
    text("thoughts and prayers", xText2, 40);
    xText1 -= 1;
    xText2 -= 1;

    if (xText1 < -265) {
        xText1 = width;
    } //if (xText2 < -265) {
//        xText2 = width;
//    }

    pop();
}

function drawFlag(x, y, s) {

    push();
    translate(x, y);
    scale(s);
    rectMode(CORNER);
    fill(textRed);

    rect(0, 130, 250, 20);
    drawStar(50, 40, 2);

    noFill();
    stroke(textRed);
    strokeWeight(10*s);
    rect(0, 0, 250, 150);
    noStroke();

    pop();

}

function drawStar(x, y, s) {
    var rOut = 10;
    var rIn = 5;

    push();
    translate(x,y);
    scale(s);
    rotate(radians(180));

    beginShape();
    for (var i = 0; i < 5; i++) {
        vertex( rOut*cos((2*PI*i/5)+(PI/2)),
                rOut*sin((2*PI*i/5)+(PI/2)));
        vertex( rIn*cos((2*PI*i/5)+(PI/2)+(2*PI/10)),
                rIn*sin((2*PI*i/5)+(PI/2)+(2*PI/10)));
    }
    endShape(CLOSE);

    pop();
}

function bottomText() {
    var lines = "NO BAILOUT\nDEMOCRATIZE POWER\nPEOPLE OVER PROFITS";

    noStroke();
    textStyle(ITALIC);
    textAlign(RIGHT, TOP);
    fill(textRed);
    textSize(14); //14
    textLeading(18);
    textFont('dosis');

    text(lines, marginS+rectX, marginT+rectY+15);

}

//not used
function storeBackground() {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            if (random(0,1) < 0.1) {
                bgx.push(x);
                bgy.push(y);
            }
        }
    }
}

//not used
function drawBackgound() {
    for (var i = 0; i < bgx.length; i++) {
        stroke('black');
        point(bgx[i], bgy[i]);
        noStroke();
    }
}

function cafiresPoster() {
    //drawBackgound();

    push();
    translate(width/2, rectY/2 + marginT);

    background(tanColor);
    fill('black');
    rectMode(CENTER);
    rect(0, 0, rectX, rectY);

    rotate(radians(-90));
    scale(0.7);

    for (var i = 0; i < numRows/3; i+=3) {
        var lat = fires.getNum(i, "X");
        var lon = fires.getNum(i, "Y");

        //var size = fires.getNum(i, "poly_GISAcres")

        var mappedLat = map(lat, -124, -114, -width/2, width/2);
        var mappedLon = map(lon, 32.55, 42, -height/2, height/2);
        //var mappedSize = map(size, 0, 223180, 20, 30);
        drawCircles(mappedLon, mappedLat, 5);
    }

    pop();

    topText();
    mainText();

    bottomText();
    noFill(); stroke(textRed);
    //drawStar(300, marginT + rectY + 40, 3);
    noStroke();
    //movingText();

    drawFlag(marginS+1, marginT+rectY+17, 0.3);
}

//capitalism is killing the planet
function drawTriangle(x, y, s, n) { //dont look at this function :///

    push();
    translate(x,y);
    scale(s);
    noFill();

    beginShape();

    vertex(-50 + random(n), 50 + random(n)); //point
    for (var i = -49; i < 49; i+=10) {
        vertex(i + random(n), 50 + random(n));
    }
    vertex(50 + random(n), 50 + random(n)); //point
    vertex(43.75 + random(n),39.375 + random(n));
    vertex(37.5 + random(n), 28.75 + random(n));
    vertex(31.25 + random(n), 18.125 + random(n));
    vertex(25 + random(n), 7.5 + random(n));
    vertex(12.5 + random(n), -13.5 + random(n));
    vertex(6.25 + random(n), -24.25 + random(n));
    vertex(3.125 + random(n), -29.625 + random(n));
    vertex(0 + random(n), -35 + random(n)); //point
    vertex(-3.125 + random(n), -29.625 + random(n));
    vertex(-12.5 + random(n), -13.5 + random(n));
    vertex(-25 + random(n), 7.5 + random(n));
    vertex(-31.25 + random(n), 18.125 + random(n));
    vertex(-37.5 + random(n), 28.75 + random(n));
    vertex(-43.75 + random(n),39.375 + random(n));

    endShape(CLOSE);

    pop();
}

function drawConcentricTriangles(x, y, n) {
    push();
    for (var i = 0; i < 6; i++) {
        strokeWeight(i);
        drawTriangle(x, y, 0.8*(6-i), n);
    }
    pop();
}

function mainTextCap() {
    textSize(40);
    fill('black');
    noStroke();
    textFont(gothic);
    textAlign(LEFT, TOP);
    text('capitalism is', 10, height/2 + 30);
    text('killing', 10, height/2 + 30 + 45);
    text('the planet', 10, height/2 + 30 + 2*45);
}

function topTextCap() {
    textSize(12);
    fill('black');
    noStroke();
    textFont(dosisL);
    textAlign(LEFT, TOP);
    text('CAN CAPITALISM SURVIVE?', 10, 10);
    text('NO, I DO NOT THINK IT CAN.', 10, 22);

    textAlign(RIGHT, TOP);
    text('ITS VERY SUCCESS UNDERMINES', width - 10, 10);
    text('THE SOCIAL INSTITUTIONS WHICH', width - 10, 22);
    text('PROTECT IT', width - 10, 34);
}

function bottomTextCap() {
    textSize(12);
    fill('black');
    noStroke();
    textFont(dosisL);
    textAlign(RIGHT, BOTTOM);
    text('1942', width - 10, height - 10 - 12 - 12);
    text('JOSEPH SCHUMPETER', width - 10, height - 10 - 12);
    text('CAPITALISM, SOCIALISM AND DEMOCRACY', width - 10, height - 10);
}

function capitalismPoster() {
    background('orange');
    noFill();
    stroke('black');

    if (mouseY > height){
        triangleRand = 0;
    } else {
        triangleRand = dist(mouseX, mouseY, mouseX, height) / 100;
    }

    stroke(tanColor); //tan
    drawConcentricTriangles(5*width/9, 120, triangleRand);

    stroke(255, 204, 64); //yellow
    drawConcentricTriangles(4*width/9, 120, 0);

    mainTextCap();
    topTextCap();

    image(barcode, 15, height-barcodeWidth-10, 30, barcodeWidth);
    bottomTextCap()
}
