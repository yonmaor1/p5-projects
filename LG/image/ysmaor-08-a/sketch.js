//yon maor
//sect B

// these three arrays, bodyLinks, feetLinks, and headLinks can be
// used to access images for Assignment 8A
var bodyLinks = [
    "http://i.imgur.com/5YM2aPE.jpg",
    "http://i.imgur.com/oKtGXfd.jpg",
    "http://i.imgur.com/Kvg75bG.jpg",
    "http://i.imgur.com/0FGzErn.jpg",
    "http://i.imgur.com/MJmlPt5.jpg",
    "http://i.imgur.com/VvX0k8e.jpg",
    "http://i.imgur.com/rLIOBoG.jpg",
    "http://i.imgur.com/q03Gko3.jpg",
    "http://i.imgur.com/BWpN5SP.jpg",
    "http://i.imgur.com/ft10TV3.jpg",
    "http://i.imgur.com/CGCZliN.jpg",
    "http://i.imgur.com/qrlc4dK.jpg"]

var feetLinks = [
    "http://i.imgur.com/oNSO0T6.jpg",
    "http://i.imgur.com/OWGETX7.jpg",
    "http://i.imgur.com/Zp29aVg.jpg",
    "http://i.imgur.com/AXLWZRR.jpg",
    "http://i.imgur.com/wgZq717.jpg",
    "http://i.imgur.com/sGVMEMw.jpg",
    "http://i.imgur.com/hfbrynH.jpg",
    "http://i.imgur.com/OOASUMM.jpg",
    "http://i.imgur.com/aqtIXi0.jpg",
    "http://i.imgur.com/Eu6ruPo.jpg",
    "http://i.imgur.com/mTSipwg.jpg",
    "http://i.imgur.com/1GzC4Zz.jpg"]

var headLinks = [
    "http://i.imgur.com/gBCZVuM.jpg",
    "http://i.imgur.com/YLOXAdH.jpg",
    "http://i.imgur.com/my3TqY7.jpg",
    "http://i.imgur.com/lvtIB9s.jpg",
    "http://i.imgur.com/gvDBfhO.jpg",
    "http://i.imgur.com/JEuJ2ER.jpg",
    "http://i.imgur.com/SbBOG1V.jpg",
    "http://i.imgur.com/cuJ5Ao1.jpg",
    "http://i.imgur.com/dqHjjig.jpg",
    "http://i.imgur.com/mcFUcHf.jpg",
    "http://i.imgur.com/0XKU9Dx.jpg",
    "http://i.imgur.com/sD1ArAR.jpg"]

var headImg = [];
var bodyImg = [];
var feetImg = [];

var head = [];
var body = [];
var feet = [];

var img;
var w = 200;
var h = 150;

function preload() {
    //populates Img arrays
    for (var i = 0; i < headLinks.length; i++) {
        img = loadImage(headLinks[i]);
        headImg.push(img);

        img = loadImage(bodyLinks[i]);
        bodyImg.push(img);

        img = loadImage(feetLinks[i]);
        feetImg.push(img);
    }

}

function setup(){
    createCanvas(600,450);

    //initial values for displayed arrays
    for (var i = 0; i < 3; i++) {
        head.push(random(headImg));
        body.push(random(bodyImg));
        feet.push(random(feetImg));
    }
    //checks for doubles
    while (head[1] == head[0]) {
        head[1] = random(headImg);
    }
    while (head[2] == head[1] || head[2] == head[0]) {
        head[2] = random(headImg);
    }

    body[0] = random(bodyImg);
    body[1] = random(bodyImg);
    body[2] = random(bodyImg);
    while (body[1]==body[0]) {
        body[1] = random(bodyImg);
    }
    while (body[2] == body[1] || body[2] == body[0]) {
        body[2] = random(bodyImg);
    }

    feet[0] = random(feetImg);
    feet[1] = random(feetImg);
    feet[2] = random(feetImg);
    while (feet[1]==feet[0]) {
        feet[1] = random(feetImg);
    }
    while (feet[2] == feet[1] || feet[2] == feet[0]) {
        feet[2] = random(feetImg);
    }
}

//re-randomises images
function mousePressed() {
    //heads
    if (mouseY < height/3) {
        head[0] = random(headImg);
        head[1] = random(headImg);
        head[2] = random(headImg);
        while (head[1] == head[0]) {
            head[1] = random(headImg);
        }
        while (head[2] == head[1] || head[2] == head[0]) {
            head[2] = random(headImg);
        }

    //bodies
    } else if (mouseY >= height/3 && mouseY < (2*height)/3) {
        body[0] = random(bodyImg);
        body[1] = random(bodyImg);
        body[2] = random(bodyImg);
        while (body[1]==body[0]) {
            body[1] = random(bodyImg);
        }
        while (body[2] == body[1] || body[2] == body[0]) {
            body[2] = random(bodyImg);
        }

    //feet
    } else if (mouseY > (2*height)/3) {
        feet[0] = random(feetImg);
        feet[1] = random(feetImg);
        feet[2] = random(feetImg);
        while (feet[1]==feet[0]) {
            feet[1] = random(feetImg);
        }
        while (feet[2] == feet[1] || feet[2] == feet[0]) {
            feet[2] = random(feetImg);
        }
    }
}

function draw() {
    push();
    image(head[0], 0, 0, w, h);
    image(body[0], 0, 150, w, h);
    image(feet[0], 0, 300, w, h);

    translate(200,0);
    image(head[1], 0, 0, w, h);
    image(body[1], 0, 150, w, h);
    image(feet[1], 0, 300, w, h);

    translate(200,0);
    image(head[2], 0, 0, w, h);
    image(body[2], 0, 150, w, h);
    image(feet[2], 0, 300, w, h);
    pop();
}
