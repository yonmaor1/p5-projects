// var gravity = 9.8;   // downward acceleration
var spring = 0.5; // how much velocity is retained after bounce
var drag = 0.0000001;    // drag causes particles to slow down
var repulsion = 1    // how much particles repel each other
var np = 6;      // how many particles
var pmin = 40;       // minimum particle size
var pmax = 60;      // maximum particle size
var particles = []; // array storing all the particles

// create a "Particle" object with position and velocity
function makeParticle(px, py, pdx, pdy, r, c) {
    p = {x: px, y: py,
         dx: pdx, dy: pdy,
         size: r,
         color: c,
         age: 0,
         stepFunction: particleStep,
         drawFunction: particleDraw
        }
    return p;
}

function particleDraw() {
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
}

function overlapped(nx, ny, particles, newr, oldr) {
    for (var i = 0; i < particles.length; i++) {
        p = particles[i]
        if (dist(nx, ny, p.x, p.y) < (newr + oldr)) {
            return true;
        }
    }
    return false;
}

function setup() {

    createCanvas(400, 400);
    frameRate(10);

    for (var i = 0; i < np; i++){
        var newp = makeParticle(random(0, width), random(0, height),
                                0, 0,
                                random(pmin,pmax), color(random(0,255),random(0,255),random(0,255)));

        /*while (overlapped(newp.x, newp.y, particles, newp.size, newp.size)){

            newp = makeParticle(random(width/3, 2*width/3), random(height/3, 2*height/3),
                                0, 0,
                                random(pmin,pmax), color(random(0,255),random(0,255),random(0,255)));

        }
        */

        particles.push(newp);

    }

    serial = new p5.SerialPort();

    serial.list();
    serial.open('/dev/tty.usbmodem2101');

    serial.on('connected', serverConnected);

    serial.on('list', gotList);

    serial.on('data', gotData);

    serial.on('error', gotError);

    serial.on('open', gotOpen);

    serial.on('close', gotClose);

}

function dist(x0, y0, x1, y1){
    return ((x1-x0)^2 + (y1-y0)^2)^0.5
}


function particleStep() {
    this.dx += dx;
    this.dy += dy;
    this.x += this.dx;
    this.y -= this.dy;
    if (this.x > width - this.size/2) { // bounce off right wall
        this.x = (width - this.size/2) - (this.x - (width - this.size/2));
        this.dx = -this.dx * spring;
    } else if (this.x < this.size/2) { // bounce off left wall
        this.x = this.size/2;
        this.dx = -this.dx * spring;
    }
    if (this.y > height - this.size/2) { // bounce off bottom
        this.y = (width - this.size/2) - (this.y - (width - this.size/2));
        this.dy = -this.dy * spring;
    } else if (this.y < this.size/2) { // bounce off top
        this.y = this.size/2;
        this.dy = -this.dy * spring;
    }

    /*
    // particle repulsion
    for (var i = 0; i < particles.length; i++) {
        p = particles[i];
        var distance = dist(this.x, this.y, p.x, p.y);
        var dirX;
        var dirY;

        if (this.x > p.x) {
            dirX = -1
        } else {
            dirX = 1
        }
        if (this.y > p.y) {
            dirY = -1
        } else {
            dirY = 1
        }
        if (distance <= (this.size + p.size)/2) {
            p.dx += dirX * repulsion * (1/dist^2);
            p.dy += dirY * repulsion * (1/dist^2);
            this.dx -= dirX * repulsion * (1/dist^2);
            this.dy -= dirX * repulsion * (1/dist^2);
        }
    }
    /*

    /*
    // particle collision
    for (var i = 0; i < particles.length; i++){
        p = particles[i];
        if (dist(this.x, this.y, p.x, p.y) < (this.size + p.size) ){
            //print('collision');
            this.dx = -this.dx * spring;
            this.dy = -this.dy * spring;
            p.dx = -p.dx * spring;
            p.dy = -p.dy * spring;
        }
    }
    */

}

// acceleration in x, y, and z
var dx;
var dy;
var dz; // not used

// draw all particles in the particles array
function draw() {
    background(230);

    var splitData = split(latestData, ',');
    dx = Number(splitData[0]);
    dy = Number(splitData[1]);
    dz = Number(splitData[2]);

    dx = map(dx, -10, 10, -5, 5);
    dy = map(dy, -10, 10, -5, 5);
    dz = map(dz, -10, 10, -5, 5);

    fill('white');
    text(latestData, 10, 15);
    text(round(dx*100)/100, 10, 30);
    text(round(dy*100)/100, 10, 45);
    text(round(dz*100)/100, 10, 60);

    stroke(0);
    strokeWeight(10);

    for (var i = 0; i < np; i++) { // for each particle
        var p = particles[i];
        //print(particles[i].x);
        p.stepFunction();
        p.drawFunction();
    }
}





// serial communication //

let serial;
let latestData = '0,0,0';

function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
 }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    let currentString = serial.readLine();
        trim(currentString);
    if (!currentString) return;
    console.log(currentString);
    latestData = currentString;
}
