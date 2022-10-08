var img;
var step = 1;
var rmax = 2;
var xpos = [];
var ypos = [];
var rad = [];

function preload() {
    img = loadImage('img/poster2.png');
}


function setup() {
    createCanvas(400,600);
    image(img, 0, 0, width, 518);
    getCols();
}


function draw() {
    background(255);

    for (var i = 0; i < xpos.length; i++) {
        fill(random(255), random(255), 0);
        ellipse(xpos[i], ypos[i], rad[i]);
    }
    noLoop();
}

function getCols() {
    rectMode(CENTER);
    noStroke();
    var xposNum;
    var yposNum;
    for (var x = 0; x < img.width; x+=step) {
        for (var y = 0; y < img.height; y+=step) {
            var c = get(x,y);
            xpos.push(x);
            ypos.push(y);

            c = red(c)+blue(c)+green(c);
            c = map(c, 0, 768, 0, rmax);
            rad.push(rmax - c);
        }
    }
}
