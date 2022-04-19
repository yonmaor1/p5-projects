var dollarX = [13,13, 27,36,45,52,57,61,64,67,70,72,71,8,7,6,5,3,0,-4,-8,-10,-12,-14,-15,-15,-12,-8,52,57,61,64,69,72,75,76,77,78,76,74,72,69,65,60,53,45,34,25,13,13,-15,-15,-30,-38,-45,-58,-63,-68,-72,-77,-79,-79,-16,-16,-15,-13,-9,-2,0,2,4,6,8,8,6,4,0,-7,-17,-50,-58,-66,-71,-76,-80,-79,-77,-70,-66,-59,-57,-48,-41,-31,-22,-16,-15];
var dollarY = [150,130,127,124,120,115,110,105,100,94,83,77,54,54,83,86,88,90,91,92,91,90,87,84,85,65,57,52,13,9,4,0,-7,-13,-21,-29,-39,-59,-73,-81,-86,-82,-99,-105,-111,-116,-121,-124,-126,-150,-150,-125,-123,-120,-117,-110,-103,-97,-89,-73,-56,-34,-34,-70,-79,-83,-87,-87,-86,-86,-85,-82,-77,-53,-45,-39,-33,-26,-19,3,9,19,27,38,51,80,89,103,108,114,117,121,124,127,129,129,150];

function preload() {
    dolarSign = loadImage('img/dollarSign.PNG');
    dosis = loadFont('fonts/Dosis-ExtraBold.ttf');
    akkordeon = loadFont('fonts/Akkordeon.otf');
    impact = loadFont('fonts/impact.ttf');
}


function setup() {
    createCanvas(400,600);
}

function draw() {
    background(220);
    for (var i = 0; i < 10; i++) {
        push();
        drawDollar(250+i, 410-i, 1.3);
        pop();
    }
    rotate(radians(60));
    translate(250, 410+150*1.3);
    fill('black');
    drawDollar(0, 0, 1.3);
    noLoop();
}

function drawDollar(x, y, s) {
    translate(x,y);
    scale(s);
    rotate(radians(180));

    beginShape()
    for (var i = 0; i < dollarX.length; i++) {
        vertex(-dollarX[i], dollarY[i]);
    }
    endShape(CLOSE);


}
